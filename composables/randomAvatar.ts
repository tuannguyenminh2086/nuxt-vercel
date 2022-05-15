export const useRandomAvatar = () => {
  const items = [
    'https://avatars.dicebear.com/api/avataaars/Hope-Howe.svg', 
    'https://avatars.dicebear.com/api/avataaars/Nelson-Jerde.svg',
    'https://avatars.dicebear.com/api/avataaars/Howell-Hand.svg',
    'https://avatars.dicebear.com/api/avataaars/Kim-Weimann.svg',
    'https://avatars.dicebear.com/api/avataaars/Adrienne-Mayer%20III.svg',
    'https://avatars.dicebear.com/api/avataaars/Travis-Davis.svg'
  ]

  return items[Math.floor(Math.random()*items.length)];
}
