import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type { ReportStatus, Statuses } from '../types'

interface ReportActions {
    startGenerating: () => void
    endGenerating: () => void
    updateReportStatus: (reportId: number, partialStatus: Partial<Statuses>) => void
    removeReportStatus: (reportId: number) => void
    addPendingReportId: (reportId: number) => void
    removePendingReportId: (reportId: number) => void
    beginReportCleanup: (reportId: number) => void
}

interface ReportState {
    isReportGenerating: boolean

    /**
     * 각 리포트 ID를 키로 하여 ReportStatus 객체를 저장
     * ex) { 17: { overviewStatus: 'PENDING', analysisStatus: 'PENDING', ... } }
     */
    statuses: Record<number, ReportStatus>
    /**
     * 현재 폴링이 필요한 리포트 ID 목록
     */
    pendingReportIds: number[]
    cleanupReportIds: number[]
    actions: ReportActions
}

export const useReportStore = create<ReportState>()(
    devtools(
        persist(
            (set) => ({
                isReportGenerating: false,
                statuses: {},
                pendingReportIds: [],
                cleanupReportIds: [],
                actions: {
                    startGenerating: () => set({ isReportGenerating: true }),
                    endGenerating: () => set({ isReportGenerating: false }),
                    updateReportStatus: (reportId, partialStatus) =>
                        set((state) => ({
                            statuses: {
                                ...state.statuses,
                                [reportId]: {
                                    ...state.statuses[reportId],
                                    ...partialStatus,
                                },
                            },
                        })),
                    removeReportStatus: (reportId) =>
                        set((state) => {
                            const newStatuses = { ...state.statuses }
                            delete newStatuses[reportId]
                            return { statuses: newStatuses }
                        }),
                    addPendingReportId: (reportId) =>
                        set((state) => ({
                            pendingReportIds: [...state.pendingReportIds, reportId],
                        })),
                    removePendingReportId: (reportId) =>
                        set((state) => ({
                            pendingReportIds: state.pendingReportIds.filter((pendingId) => pendingId !== reportId),
                        })),
                    beginReportCleanup: (reportId) =>
                        set((state) => ({
                            cleanupReportIds: [...state.cleanupReportIds, reportId],
                        })),
                },
            }),
            {
                name: 'report-storage',
                storage: createJSONStorage(() => sessionStorage),
                partialize: (state) => ({ pendingReportIds: state.pendingReportIds }),
            }
        )
    )
)
