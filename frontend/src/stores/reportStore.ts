import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProcessingReport {
    reportId: number
    videoId: number
    title: string
    isHidden: boolean
}

interface ReportState {
    reports: ProcessingReport[]
    addReport: (report: Omit<ProcessingReport, 'isHidden'>) => void
    removeReport: (reportId: number) => void
    hideReport: (reportId: number) => void
    clearReports: () => void
}

export const useReportStore = create<ReportState>()(
    persist(
        (set) => ({
            reports: [],
            addReport: (newReport) =>
                set((state) => {
                    // 이미 있으면 무시
                    if (state.reports.some((r) => r.reportId === newReport.reportId)) {
                        return state
                    }
                    return { reports: [...state.reports, { ...newReport, isHidden: false }] }
                }),
            removeReport: (reportId) =>
                set((state) => ({
                    reports: state.reports.filter((r) => r.reportId !== reportId),
                })),
            // 리포트를 삭제하지 않고 숨김 처리만 함 (백그라운드 실행)
            hideReport: (reportId) =>
                set((state) => ({
                    reports: state.reports.map((r) => (r.reportId === reportId ? { ...r, isHidden: true } : r)),
                })),
            clearReports: () => set({ reports: [] }),
        }),
        {
            name: 'processing-reports-storage',
        }
    )
)
