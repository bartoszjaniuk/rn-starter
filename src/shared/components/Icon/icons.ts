import AppleSvg from '../../../../assets/icons/apple.svg';
import ArrowLeftSvg from '../../../../assets/icons/arrowLeft.svg';
import BinSvg from '../../../../assets/icons/bin.svg';
import CalendarLinearSvg from '../../../../assets/icons/calendar-linear.svg';
import CalendarSvg from '../../../../assets/icons/calendar.svg';
import CheckmarkSvg from '../../../../assets/icons/checkmark.svg';
import ChevronSvg from '../../../../assets/icons/chevron.svg';
import CloseXSvg from '../../../../assets/icons/closeX.svg';
import DocumentSvg from '../../../../assets/icons/document.svg';
import DotsSvg from '../../../../assets/icons/dots.svg';
import FacebookSvg from '../../../../assets/icons/facebook.svg';
import GoogleSvg from '../../../../assets/icons/google.svg';
import HomeSvg from '../../../../assets/icons/home.svg';
import MailSvg from '../../../../assets/icons/mail.svg';
import MusculeSvg from '../../../../assets/icons/muscule.svg';
import PhoneSvg from '../../../../assets/icons/phone.svg';
import PhotoSvg from '../../../../assets/icons/photo.svg';
import PlusSvg from '../../../../assets/icons/plus.svg';
import PlusThinSvg from '../../../../assets/icons/plusThin.svg';
import ProfileSvg from '../../../../assets/icons/profile.svg';
import SortDescSvg from '../../../../assets/icons/sortDesc.svg';
import StarSvg from '../../../../assets/icons/star.svg';
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
  star: StarSvg,
  mail: MailSvg,
  phone: PhoneSvg,
  plusThin: PlusThinSvg,
  calendarLinear: CalendarLinearSvg,
  closeX: CloseXSvg,
};

export type IconName = keyof typeof icons;
