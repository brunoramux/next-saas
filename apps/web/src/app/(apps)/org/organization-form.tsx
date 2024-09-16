'use client'
import { AlertTriangle, Loader2 } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import {
  createOrganizationAction,
  type OrganizationSchema,
  updateOrganizationAction,
} from './action'

/* Este formulário pode ser usado para atualizar ou para criar ornigazações. As propriedades abaixo controlam qual das ações deve ser executada */
interface OrganizationFormProps {
  isUpdating?: boolean
  initialData?: OrganizationSchema
}

export default function OrganizationForm({
  isUpdating = false,
  initialData,
}: OrganizationFormProps) {
  /* Caso a propriedade isUpdating seja informada, a action a ser utilizada é a updateOrnigazationAction */
  /* Caso a propriedade isUpdating não seja informada, a action a ser utilizada é a createOrnigazationAction */
  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction

  /* Hook personalizado, criado para controle de Forms da aplicação */
  const [{ success, errors, message }, handleSubmit, isPending] =
    useFormState(formAction)

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="name">Organization name</Label>
        <Input
          name="name"
          type="text"
          id="name"
          defaultValue={initialData?.name}
        />
        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          name="domain"
          type="text"
          id="domain"
          inputMode="url"
          placeholder="example.com"
          defaultValue={initialData?.domain ?? undefined}
        />
        {errors?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.domain[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <Checkbox
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            className="translate-y-0.5"
            defaultChecked={initialData?.shouldAttachUsersByDomain}
          />
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm font-medium leading-none">
              Auto-join new members
            </span>
            <p className="text-sm text-muted-foreground">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save organization'
        )}
      </Button>
    </form>
  )
}
