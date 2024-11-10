import AppleSvg from '../../../../assets/icons/apple.svg';
import ArrowLeftSvg from '../../../../assets/icons/arrowLeft.svg';
import BinSvg from '../../../../assets/icons/bin.svg';
import CalendarSvg from '../../../../assets/icons/calendar.svg';
import CheckmarkSvg from '../../../../assets/icons/checkmark.svg';
import ChevronSvg from '../../../../assets/icons/chevron.svg';
import DocumentSvg from '../../../../assets/icons/document.svg';
import DotsSvg from '../../../../assets/icons/dots.svg';
import FacebookSvg from '../../../../assets/icons/facebook.svg';
import GoogleSvg from '../../../../assets/icons/google.svg';
import HomeSvg from '../../../../assets/icons/home.svg';
import MusculeSvg from '../../../../assets/icons/muscule.svg';
import PhotoSvg from '../../../../assets/icons/photo.svg';
import PlusSvg from '../../../../assets/icons/plus.svg';
import ProfileSvg from '../../../../assets/icons/profile.svg';
import SortDescSvg from '../../../../assets/icons/sortDesc.svg';
import TraineesSvg from '../../../../assets/icons/trainees.svg';

export const icons = {
  plus: PlusSvg,
  home: HomeSvg,
  document: DocumentSvg,
  profile: ProfileSvg,
  checkmark: CheckmarkSvg,
  calendar: CalendarSvg,
  arrowLeft: ArrowLeftSvg,
  chevron: ChevronSvg,
  facebook: FacebookSvg,
  google: GoogleSvg,
  apple: AppleSvg,
  trainees: TraineesSvg,
  bin: BinSvg,
  muscule: MusculeSvg,
  photo: PhotoSvg,
  dots: DotsSvg,
  sortDesc: SortDescSvg,
};

export type IconName = keyof typeof icons;
