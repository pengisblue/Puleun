import { redirect } from "react-router-dom"

export function action() {
  localStorage.removeItem('userInfo')
  return redirect('/hello')
}