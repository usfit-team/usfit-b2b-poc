import { ConfirmationPage } from '@/components/shared/ConfirmationPage'

function ContractSuccessPage() {
  return (
    <ConfirmationPage
      title="Contrato criado com sucesso!"
      message="O contrato foi registrado e o aluno será notificado sobre os termos."
      backHref="/contracts"
      backLabel="Voltar para Contratos"
    />
  )
}

export { ContractSuccessPage }
export default ContractSuccessPage
