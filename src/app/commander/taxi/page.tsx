import { redirect } from 'next/navigation';

export default function CommanderTaxiPage() {
  redirect('/booking/new?type=taxi');
}
