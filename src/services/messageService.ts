
export function handleMessage(msg: string): string {
  console.log('message received:', msg);
  return `user says: ${msg}`;
}
