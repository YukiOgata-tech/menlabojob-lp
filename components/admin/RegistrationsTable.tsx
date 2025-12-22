"use client";

import { useState, useMemo } from "react";
import { RegistrationRecord } from "@/lib/firebase/registrations";
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
import { Download, Search } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface RegistrationsTableProps {
  registrations: RegistrationRecord[];
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

export function RegistrationsTable({ registrations }: RegistrationsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof RegistrationRecord>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // フィルタリングとソート
  const filteredAndSortedData = useMemo(() => {
    let filtered = registrations.filter((reg) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        reg.fullName.toLowerCase().includes(searchLower) ||
        reg.email.toLowerCase().includes(searchLower) ||
        reg.phoneNumber.includes(searchTerm) ||
        reg.prefecture.includes(searchTerm)
      );
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [registrations, searchTerm, sortField, sortOrder]);

  // ソート変更
  const handleSort = (field: keyof RegistrationRecord) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
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
      reg.fullName,
      reg.age,
      reg.prefecture,
      reg.phoneNumber,
      reg.email,
      getPriorityLabel(reg.priority),
      reg.qualifications.join("、"),
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
    <div className="space-y-4">
      {/* ツールバー */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="氏名、メール、電話番号、都道府県で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          CSV エクスポート
        </Button>
      </div>

      {/* 統計情報 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">総登録数</p>
          <p className="text-2xl font-bold">{registrations.length}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">エージェント希望</p>
          <p className="text-2xl font-bold">
            {registrations.filter((r) => r.applyForAgent).length}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">表示中</p>
          <p className="text-2xl font-bold">{filteredAndSortedData.length}</p>
        </div>
      </div>

      {/* テーブル */}
      <div className="rounded-lg border">
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
                    <TableCell className="font-medium">{reg.fullName}</TableCell>
                    <TableCell>{reg.age}</TableCell>
                    <TableCell>{reg.prefecture}</TableCell>
                    <TableCell>{reg.phoneNumber}</TableCell>
                    <TableCell>{reg.email}</TableCell>
                    <TableCell>{getPriorityLabel(reg.priority)}</TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="truncate" title={reg.qualifications.join("、")}>
                        {reg.qualifications.join("、")}
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
                      <span
                        className={
                          reg.status === "pending"
                            ? "text-yellow-600"
                            : reg.status === "approved"
                              ? "text-green-600"
                              : "text-red-600"
                        }
                      >
                        {reg.status === "pending"
                          ? "未対応"
                          : reg.status === "approved"
                            ? "承認済み"
                            : "却下"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
