import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNewRegistrations,
  getLastFetch,
  clearRegistrationsCache,
  RegistrationRecord,
} from "../firebase/registrations";
import { useState, useCallback } from "react";

export function useRegistrations() {
  const queryClient = useQueryClient();
  const [allRegistrations, setAllRegistrations] = useState<
    RegistrationRecord[]
  >([]);

  // 増分データを取得
  const { data: newData, isLoading, error, refetch } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const lastFetch = getLastFetch();
      const newRegistrations = await getNewRegistrations(lastFetch);
      return newRegistrations;
    },
  });

  // 新規データと既存データをマージ
  const mergeRegistrations = useCallback(
    (existingData: RegistrationRecord[], newData: RegistrationRecord[]) => {
      const merged = [...newData];
      const newIds = new Set(newData.map((r) => r.id));

      // 既存データの中で、新規データに含まれていないものを追加
      existingData.forEach((existing) => {
        if (!newIds.has(existing.id)) {
          merged.push(existing);
        }
      });

      // createdAtで降順ソート
      merged.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      return merged;
    },
    []
  );

  // データが取得されたらマージ
  if (newData) {
    const merged = mergeRegistrations(allRegistrations, newData);
    if (JSON.stringify(merged) !== JSON.stringify(allRegistrations)) {
      setAllRegistrations(merged);
    }
  }

  // 全データを再取得（手動リフレッシュ）
  const refreshAll = useCallback(async () => {
    // キャッシュをクリア
    clearRegistrationsCache();

    // クエリキャッシュもクリア
    queryClient.clear();

    // データを再取得
    const { data } = await refetch();

    if (data) {
      setAllRegistrations(data);
    }
  }, [queryClient, refetch]);

  // ローカルの登録データを即座に更新（楽観的更新）
  const updateLocalRegistration = useCallback(
    (registrationId: string, updates: Partial<RegistrationRecord>) => {
      setAllRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === registrationId ? { ...reg, ...updates } : reg
        )
      );
    },
    []
  );

  // 最後の更新時刻
  const lastFetchTime = getLastFetch();

  return {
    registrations: allRegistrations,
    isLoading,
    error,
    refreshAll,
    updateLocalRegistration,
    lastFetchTime,
  };
}
