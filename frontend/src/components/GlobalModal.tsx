import { useModalType, useModalActions, type ModalType } from '../stores/modalStore'
import { ReportLimitModal } from '../pages/main/_components/ReportLimitModal'

interface BaseModalProps {
    onClose: () => void
}

const MODAL_COMPONENTS: Record<NonNullable<ModalType>, React.ComponentType<BaseModalProps>> = {
    GENERATING_LIMIT: ReportLimitModal,
}

export default function GlobalModal() {
    const type = useModalType()
    const { closeModal } = useModalActions()

    if (!type) return null

    const ModalComponent = MODAL_COMPONENTS[type]

    return <ModalComponent onClose={closeModal} />
}
