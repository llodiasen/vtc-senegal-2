import { redirect } from 'next/navigation';

export default function CommanderMotoPage() {
  redirect('/booking/new?type=moto');
}
