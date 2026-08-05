import SearchHeader from '../components/SearchHeader';
import Carousel from '../components/Carousel';
import ChipGroup from '../components/ChipGroup';
import HorizontalRail from '../components/HorizontalRail';
import TenureSelector from '../components/TenureSelector';
import IconTextRow from '../components/IconTextRow';
import CtaBanner from '../components/CtaBanner';
import { SduiComponentType } from '../schema/types';

// Using Record<SduiComponentType, any> to bypass strict function prop signature mismatches
// during dynamic layout mapping commit phases.
export const ComponentRegistry: Record<SduiComponentType, any> = {
  search_header: SearchHeader,
  carousel: Carousel,
  chip_group: ChipGroup,
  horizontal_rail: HorizontalRail,
  tenure_selector: TenureSelector,
  icon_text_row: IconTextRow,
  cta_banner: CtaBanner,
};
