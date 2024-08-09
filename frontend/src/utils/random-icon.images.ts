const iconImages = [
  'https://cdn-icons-png.flaticon.com/512/3240/3240797.png',
  'https://cdn-icons-png.flaticon.com/512/4335/4335405.png',
  'https://cdn-icons-png.flaticon.com/512/3152/3152908.png',
  'https://cdn-icons-png.flaticon.com/512/9079/9079450.png',
  'https://cdn-icons-png.flaticon.com/512/2813/2813245.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_-S2P1_A6Isj9ssQSgUtwfmc4-_85R_nN3ZD4nv2ozkH8eP5uiOt09c0U9NS1idQxGk&usqp=CAU',
];

export function getAvatarImage(index: number): string {
  return iconImages[index % iconImages.length];
}
