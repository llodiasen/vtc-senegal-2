import { redirect } from 'next/navigation';

export default function CommanderVTCPage() {
  redirect('/booking/new?type=vtc');
}
