import { useModalType, useModalActions } from '../stores/modalStore'
import { ReportLimitModal } from '../pages/main/_components/ReportLimitModal'

const MODAL_COMPONENTS: Record<string, React.ComponentType<any>> = {
    GENERATING_LIMIT: ReportLimitModal,
}

export default function GlobalModal() {
    const type = useModalType()
    const { closeModal } = useModalActions()

    if (!type) return null

    const ModalComponent = MODAL_COMPONENTS[type]

    return <ModalComponent onClose={closeModal} />
}
