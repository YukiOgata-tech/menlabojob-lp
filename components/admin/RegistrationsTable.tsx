"use client";

import { useState, useMemo } from "react";
import { RegistrationRecord, updateRegistrationStatus } from "@/lib/firebase/registrations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Download, Search, Loader2, Eye, EyeOff, X, Filter } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { MaskedText } from "./MaskedText";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface RegistrationsTableProps {
  registrations: RegistrationRecord[];
  onUpdateRegistration: (registrationId: string, updates: Partial<RegistrationRecord>) => void;
}

// 優先条件の日本語マッピング
const priorityLabels: Record<string, string> = {
  vision: "ビジョン",
  fulfillment: "やりがい",
  salary: "給与",
  location: "勤務地",
  atmosphere: "雰囲気",
  benefits: "福利厚生",
};

// 優先条件を日本語に変換
const getPriorityLabel = (value: string): string => {
  return priorityLabels[value] || value;
};

export function RegistrationsTable({ registrations, onUpdateRegistration }: RegistrationsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof RegistrationRecord>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [updatingStatus, setUpdatingStatus] = useState<Record<string, boolean>>({});
  const [showAllPersonalInfo, setShowAllPersonalInfo] = useState(false);

  // フィルター状態
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [minAge, setMinAge] = useState<string>("");
  const [maxAge, setMaxAge] = useState<string>("");
  const [qualificationFilter, setQualificationFilter] = useState<string>("all");

  // 年齢ポップオーバー用の一時的な値
  const [tempMinAge, setTempMinAge] = useState<string>("");
  const [tempMaxAge, setTempMaxAge] = useState<string>("");
  const [agePopoverOpen, setAgePopoverOpen] = useState(false);

  const queryClient = useQueryClient();

  // 全資格の一覧を取得
  const allQualifications = useMemo(() => {
    const qualSet = new Set<string>();
    registrations.forEach((reg) => {
      reg.qualifications.forEach((qual) => qualSet.add(qual));
    });
    return Array.from(qualSet).sort();
  }, [registrations]);

  // フィルタリングとソート
  const filteredAndSortedData = useMemo(() => {
    let filtered = registrations.filter((reg) => {
      // テキスト検索
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        reg.fullName?.toLowerCase().includes(searchLower) ||
        reg.email?.toLowerCase().includes(searchLower) ||
        reg.phoneNumber?.includes(searchTerm) ||
        reg.prefecture?.includes(searchTerm);

      // ステータスフィルター
      const matchesStatus =
        statusFilter === "all" || reg.status === statusFilter;

      // 年齢フィルター
      let matchesAge = true;
      const age = reg.age;
      const minAgeNum = minAge ? parseInt(minAge, 10) : null;
      const maxAgeNum = maxAge ? parseInt(maxAge, 10) : null;

      if (minAgeNum !== null && age < minAgeNum) {
        matchesAge = false;
      }
      if (maxAgeNum !== null && age > maxAgeNum) {
        matchesAge = false;
      }

      // 資格フィルター
      const matchesQualification =
        qualificationFilter === "all" ||
        reg.qualifications.includes(qualificationFilter);

      return matchesSearch && matchesStatus && matchesAge && matchesQualification;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [registrations, searchTerm, sortField, sortOrder, statusFilter, minAge, maxAge, qualificationFilter]);

  // ソート変更
  const handleSort = (field: keyof RegistrationRecord) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  // 年齢フィルターを適用
  const applyAgeFilter = () => {
    setMinAge(tempMinAge);
    setMaxAge(tempMaxAge);
    setAgePopoverOpen(false);
  };

  // 年齢フィルターをキャンセル
  const cancelAgeFilter = () => {
    setTempMinAge(minAge);
    setTempMaxAge(maxAge);
    setAgePopoverOpen(false);
  };

  // 年齢フィルターの表示テキスト
  const getAgeFilterLabel = () => {
    if (minAge && maxAge) {
      return `${minAge}-${maxAge}歳`;
    } else if (minAge) {
      return `${minAge}歳以上`;
    } else if (maxAge) {
      return `${maxAge}歳以下`;
    }
    return "年齢";
  };

  // フィルターをクリア
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setMinAge("");
    setMaxAge("");
    setTempMinAge("");
    setTempMaxAge("");
    setQualificationFilter("all");
  };

  // フィルターが適用されているか確認
  const hasActiveFilters =
    searchTerm !== "" ||
    statusFilter !== "all" ||
    minAge !== "" ||
    maxAge !== "" ||
    qualificationFilter !== "all";

  // ステータス変更
  const handleStatusChange = async (
    registrationId: string,
    newStatus: "pending" | "approved" | "rejected"
  ) => {
    // 元のステータスを保存（ロールバック用）
    const originalReg = registrations.find(r => r.id === registrationId);
    const originalStatus = originalReg?.status;

    // 楽観的更新: UIを即座に更新
    onUpdateRegistration(registrationId, { status: newStatus });

    setUpdatingStatus((prev) => ({ ...prev, [registrationId]: true }));
    try {
      // Firestoreを更新
      await updateRegistrationStatus(registrationId, newStatus);
      toast.success("ステータスを更新しました");

      // キャッシュを無効化してデータを再取得（バックグラウンドで同期）
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("ステータスの更新に失敗しました");

      // エラー時は元に戻す（ロールバック）
      if (originalStatus) {
        onUpdateRegistration(registrationId, { status: originalStatus });
      }
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [registrationId]: false }));
    }
  };

  // CSV エクスポート
  const exportToCSV = () => {
    const headers = [
      "登録日時",
      "氏名",
      "年齢",
      "都道府県",
      "電話番号",
      "メールアドレス",
      "優先条件",
      "資格",
      "エージェント希望",
      "ステータス",
    ];

    const csvData = filteredAndSortedData.map((reg) => [
      format(reg.createdAt, "yyyy/MM/dd HH:mm:ss", { locale: ja }),
      reg.fullName || "",
      reg.age || "",
      reg.prefecture || "",
      reg.phoneNumber || "",
      reg.email || "",
      getPriorityLabel(reg.priority),
      reg.qualifications?.join("、") || "",
      reg.applyForAgent ? "希望する" : "希望しない",
      reg.status === "pending" ? "未対応" : reg.status === "approved" ? "承認済み" : "却下",
    ]);

    const csv = [headers, ...csvData]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `registrations_${format(new Date(), "yyyyMMdd_HHmmss")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* ツールバー */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
        <div className="flex gap-1.5 sm:gap-2">
          <Button
            onClick={() => setShowAllPersonalInfo(!showAllPersonalInfo)}
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs sm:text-sm"
          >
            {showAllPersonalInfo ? (
              <>
                <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">一括非表示</span>
                <span className="sm:hidden">非表示</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">一括表示</span>
                <span className="sm:hidden">表示</span>
              </>
            )}
          </Button>
          <Button onClick={exportToCSV} variant="outline" size="sm" className="gap-1.5 text-xs sm:text-sm">
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">CSV</span>
            <span className="sm:hidden">CSV</span>
          </Button>
        </div>
      </div>

      {/* フィルター */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="grid grid-cols-3 gap-2 flex-1 sm:flex sm:gap-2">
          {/* ステータスフィルター */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 text-xs sm:text-sm sm:w-[160px]">
              <SelectValue placeholder="ステータス" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全てのステータス</SelectItem>
              <SelectItem value="pending" className="text-yellow-600">未対応</SelectItem>
              <SelectItem value="approved" className="text-green-600">承認済み</SelectItem>
              <SelectItem value="rejected" className="text-red-600">却下</SelectItem>
            </SelectContent>
          </Select>

          {/* 年齢フィルター（ポップオーバー） */}
          <Popover
            open={agePopoverOpen}
            onOpenChange={(open) => {
              setAgePopoverOpen(open);
              if (open) {
                // ポップオーバーを開くときに現在の値で初期化
                setTempMinAge(minAge);
                setTempMaxAge(maxAge);
              }
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`h-9 justify-start text-xs sm:text-sm sm:w-[160px] ${
                  minAge || maxAge ? "border-primary text-primary" : ""
                }`}
              >
                <Filter className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {getAgeFilterLabel()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4" align="start">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3 font-semibold text-sm">年齢範囲を指定</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="min-age" className="w-16 text-xs">
                        最小年齢
                      </Label>
                      <Input
                        id="min-age"
                        type="number"
                        placeholder="18"
                        value={tempMinAge}
                        onChange={(e) => setTempMinAge(e.target.value)}
                        min="18"
                        className="h-9 flex-1 text-sm"
                      />
                      <span className="text-xs text-muted-foreground">歳</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="max-age" className="w-16 text-xs">
                        最大年齢
                      </Label>
                      <Input
                        id="max-age"
                        type="number"
                        placeholder="99"
                        value={tempMaxAge}
                        onChange={(e) => setTempMaxAge(e.target.value)}
                        min="18"
                        className="h-9 flex-1 text-sm"
                      />
                      <span className="text-xs text-muted-foreground">歳</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cancelAgeFilter}
                    className="text-xs"
                  >
                    キャンセル
                  </Button>
                  <Button
                    size="sm"
                    onClick={applyAgeFilter}
                    className="text-xs"
                  >
                    適用
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* 資格フィルター */}
          <Select value={qualificationFilter} onValueChange={setQualificationFilter}>
            <SelectTrigger className="h-9 text-xs sm:text-sm sm:w-[180px]">
              <SelectValue placeholder="資格" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全ての資格</SelectItem>
              {allQualifications.map((qual) => (
                <SelectItem key={qual} value={qual}>
                  {qual}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* クリアボタン */}
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs sm:text-sm whitespace-nowrap"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            クリア
          </Button>
        )}
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="rounded-lg border bg-card p-2.5 sm:p-4">
          <p className="text-xs text-muted-foreground sm:text-sm">総登録数</p>
          <p className="text-lg font-bold sm:text-2xl">{registrations.length}</p>
        </div>
        <div className="rounded-lg border bg-card p-2.5 sm:p-4">
          <p className="text-xs text-muted-foreground sm:text-sm">エージェント</p>
          <p className="text-lg font-bold sm:text-2xl">
            {registrations.filter((r) => r.applyForAgent).length}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-2.5 sm:p-4">
          <p className="text-xs text-muted-foreground sm:text-sm">表示中</p>
          <p className="text-lg font-bold sm:text-2xl">{filteredAndSortedData.length}</p>
        </div>
      </div>

      {/* デスクトップ: テーブル表示 */}
      <div className="hidden rounded-lg border md:block">
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-muted">
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  登録日時 {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("fullName")}
                >
                  氏名 {sortField === "fullName" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>年齢</TableHead>
                <TableHead>都道府県</TableHead>
                <TableHead>電話番号</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>優先条件</TableHead>
                <TableHead>資格</TableHead>
                <TableHead>エージェント</TableHead>
                <TableHead>ステータス</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-muted-foreground">
                    データがありません
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedData.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(reg.createdAt, "yyyy/MM/dd HH:mm", { locale: ja })}
                    </TableCell>
                    <TableCell className="font-medium">{reg.fullName || "-"}</TableCell>
                    <TableCell>{reg.age || "-"}</TableCell>
                    <TableCell>{reg.prefecture || "-"}</TableCell>
                    <TableCell>
                      <MaskedText value={reg.phoneNumber || ""} type="phone" forceVisible={showAllPersonalInfo} />
                    </TableCell>
                    <TableCell>
                      <MaskedText value={reg.email || ""} type="email" forceVisible={showAllPersonalInfo} />
                    </TableCell>
                    <TableCell>{getPriorityLabel(reg.priority)}</TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="truncate" title={reg.qualifications?.join("、") || ""}>
                        {reg.qualifications?.join("、") || "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {reg.applyForAgent ? (
                        <span className="text-green-600">希望</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select
                          value={reg.status}
                          onValueChange={(value) =>
                            handleStatusChange(
                              reg.id,
                              value as "pending" | "approved" | "rejected"
                            )
                          }
                          disabled={updatingStatus[reg.id]}
                        >
                          <SelectTrigger
                            className={`w-[120px] ${
                              reg.status === "pending"
                                ? "text-yellow-600 border-yellow-600"
                                : reg.status === "approved"
                                  ? "text-green-600 border-green-600"
                                  : "text-red-600 border-red-600"
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending" className="text-yellow-600">
                              未対応
                            </SelectItem>
                            <SelectItem value="approved" className="text-green-600">
                              承認済み
                            </SelectItem>
                            <SelectItem value="rejected" className="text-red-600">
                              却下
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {updatingStatus[reg.id] && (
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* モバイル: カード表示 */}
      <div className="space-y-3 md:hidden">
        {filteredAndSortedData.length === 0 ? (
          <div className="rounded-lg border bg-card p-8 text-center text-sm text-muted-foreground">
            データがありません
          </div>
        ) : (
          filteredAndSortedData.map((reg) => (
            <div key={reg.id} className="rounded-lg border bg-card p-3 text-sm">
              {/* ヘッダー: 日時とステータス */}
              <div className="mb-3 flex items-start justify-between gap-2 border-b pb-2">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    {format(reg.createdAt, "yyyy/MM/dd HH:mm", { locale: ja })}
                  </p>
                  <p className="mt-1 font-bold text-foreground">{reg.fullName || "-"}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Select
                    value={reg.status}
                    onValueChange={(value) =>
                      handleStatusChange(
                        reg.id,
                        value as "pending" | "approved" | "rejected"
                      )
                    }
                    disabled={updatingStatus[reg.id]}
                  >
                    <SelectTrigger
                      className={`h-7 w-[90px] text-xs ${
                        reg.status === "pending"
                          ? "text-yellow-600 border-yellow-600"
                          : reg.status === "approved"
                            ? "text-green-600 border-green-600"
                            : "text-red-600 border-red-600"
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending" className="text-yellow-600 text-xs">
                        未対応
                      </SelectItem>
                      <SelectItem value="approved" className="text-green-600 text-xs">
                        承認済み
                      </SelectItem>
                      <SelectItem value="rejected" className="text-red-600 text-xs">
                        却下
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {updatingStatus[reg.id] && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* 詳細情報 */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">年齢</p>
                    <p className="font-medium">{reg.age || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">都道府県</p>
                    <p className="font-medium">{reg.prefecture || "-"}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">電話番号</p>
                  <MaskedText value={reg.phoneNumber || ""} type="phone" forceVisible={showAllPersonalInfo} />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">メールアドレス</p>
                  <MaskedText value={reg.email || ""} type="email" forceVisible={showAllPersonalInfo} />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">優先条件</p>
                  <p className="font-medium">{getPriorityLabel(reg.priority)}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">資格</p>
                  <p className="font-medium">
                    {reg.qualifications && reg.qualifications.length > 0 ? reg.qualifications.join("、") : "-"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">エージェント</p>
                    {reg.applyForAgent ? (
                      <span className="text-sm font-medium text-green-600">希望</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
