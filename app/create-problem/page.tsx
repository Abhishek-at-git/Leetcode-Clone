
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/generated/prisma/enums';
import { getCurrentUserData } from '@/modules/auth/actions';
import { CreateProblemForm } from '@/modules/problems/components/create-problems-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const CreateProblemPage = async () => {
  const currentUserResult = await getCurrentUserData();

  if (!currentUserResult.success || !currentUserResult.data) {
    redirect("/");
  }

  if (currentUserResult.data.role !== UserRole.ADMIN) {
    redirect("/");
  }

  const user = currentUserResult.data;

  return (
    <section className='flex flex-col items-center justify-center mx-4 my-4'>
      <div className='flex flex-row justify-between items-center w-full'>
        <Link href={"/"}>
          <Button variant={"outline"} size={"icon"}>
            <ArrowLeft className='size-4'/>
          </Button>
        </Link>
        <h1 className='text-3xl font-bold text-amber-400'>Welcome {user.firstName || 'Admin'}! Create a Problem</h1>
        <ModeToggle />
      </div>

      <CreateProblemForm />
    </section>
  );
};

export default CreateProblemPage