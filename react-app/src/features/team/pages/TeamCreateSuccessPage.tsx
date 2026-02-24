import { ConfirmationPage } from '@/components/shared/ConfirmationPage'

function TeamCreateSuccessPage() {
  return (
    <ConfirmationPage
      title="Profissional cadastrado!"
      message="O novo membro da equipe foi adicionado com sucesso e receberá um e-mail com as credenciais de acesso."
      backHref="/team"
      backLabel="Voltar para Equipe"
    />
  )
}

export { TeamCreateSuccessPage }
export default TeamCreateSuccessPage
