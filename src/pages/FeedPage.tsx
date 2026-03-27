import { useAuth } from '@/features/auth/context/AuthContext'

function FeedPage() {
  const { authUser } = useAuth()

  return (
    <section className="flex-1 flex justify-center items-center">
      <h1 className="text-2xl font-bold text-foreground">
        @{authUser?.handle}
      </h1>
    </section>
  )
}

export default FeedPage
