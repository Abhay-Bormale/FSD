import { api } from "./client"

export async function changePassword(currentPassword: string, newPassword: string) {
  await api.post("/me/change-password", { currentPassword, newPassword })
}

export async function deleteMe() {
  await api.delete("/me")
}

