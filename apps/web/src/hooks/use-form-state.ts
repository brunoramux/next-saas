import { FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Código para pegar dados do formulário
    const form = event.currentTarget
    const data = new FormData(form)

    // startTransition controla o estado do Form para que possamos usar o isPending
    startTransition(async () => {
      // Executa a action (função passada via parâmetro que representa a action a ser executada pelo formulário)
      const state = await action(data)

      // onSuccess: outra função passada como parâmetro para ser executada em caso de sucesso
      if (state.success === true && onSuccess) {
        await onSuccess()
      }

      // seta resultado da action no formState para ser acessado externamente. O resultado sempre possui um objeto {success, message, errors}
      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
