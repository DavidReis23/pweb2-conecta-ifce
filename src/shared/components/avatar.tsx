import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

function AvatarUser() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default AvatarUser
