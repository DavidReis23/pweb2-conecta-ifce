import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

function UserAvatar({
  imageUrl,
  initials,
  size,
}: {
  imageUrl: string | undefined
  initials: string
  size: 'default' | 'sm' | 'lg' | undefined
}) {
  return (
    <Avatar size={size}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback className="bg-primary/20 text-primary border border-primary/50 font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
