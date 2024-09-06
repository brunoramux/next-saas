import CreateProjectForm from '@/app/(apps)/org/[slug]/create-project/create-project-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <CreateProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
