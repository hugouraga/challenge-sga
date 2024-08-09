import { tutorProps } from "@/interfaces/tutor.interface";

export interface TutorialItemProps {
  index: number;
  tutor: tutorProps
  selected: boolean;
  onClick: () => void;
}
