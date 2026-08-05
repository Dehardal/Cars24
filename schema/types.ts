// Server-Driven UI (SDUI) TypeScript Type Definitions
// Generated from cars24_home.json definition

export interface SduiScreen {
  screenId: string;
  schemaVersion: string;
  minAppVersion?: number;
  state?: Record<string, any>;
  sections: SduiSection[];
  fallback?: Record<string, any>;
}

// Discriminated Union for SDUI Sections/Components
export type SduiSection =
  | SearchHeaderSection
  | CarouselSection
  | ChipGroupSection
  | HorizontalRailSection
  | TenureSelectorSection
  | IconTextRowSection
  | CtaBannerSection;

export interface BaseSection<T extends string, P> {
  id: string;
  type: T;
  minAppVersion?: number;
  props: P;
  actions?: Record<string, SduiAction>;
  computed?: Record<string, any>;
}

// 1. search_header
export type SearchHeaderSection = BaseSection<'search_header', SearchHeaderProps>;
export interface SearchHeaderProps {
  placeholder: string;
  location: string;
}

// 2. carousel
export type CarouselSection = BaseSection<'carousel', CarouselProps>;
export interface CarouselProps {
  autoScrollMs?: number;
  items: CarouselItem[];
}
export interface CarouselItem {
  imageUrl: string;
  actions?: {
    onTap?: SduiAction;
    [key: string]: SduiAction | undefined;
  };
}

// 3. chip_group
export type ChipGroupSection = BaseSection<'chip_group', ChipGroupProps>;
export interface ChipGroupProps {
  selectedId: string;
  options: ChipOption[];
}
export interface ChipOption {
  id: string;
  label: string;
}

// 4. horizontal_rail
export type HorizontalRailSection = BaseSection<'horizontal_rail', HorizontalRailProps>;
export interface HorizontalRailProps {
  title: string;
  itemType: string;
  items: CarCardItem[];
}
export interface CarCardItem {
  carId: string;
  title: string;
  price: string;
  km?: string;
  imageUrl: string;
}

// 5. tenure_selector
export type TenureSelectorSection = BaseSection<'tenure_selector', TenureSelectorProps>;
export interface TenureSelectorProps {
  options: number[];
  selectedBind: string;
  displayBind: string;
  selectedMonths?: number;
  emiValue?: string;
}

// 6. icon_text_row
export type IconTextRowSection = BaseSection<'icon_text_row', IconTextRowProps>;
export interface IconTextRowProps {
  items: IconTextItem[];
}
export interface IconTextItem {
  icon: string;
  label: string;
}

// 7. cta_banner
export type CtaBannerSection = BaseSection<'cta_banner', CtaBannerProps>;
export interface CtaBannerProps {
  title: string;
  ctaLabel: string;
}

// Closed Discriminated Union for Actions to enforce compile-time exhaustiveness checks
export type SduiAction =
  | NavigateAction
  | UpdateStateAction
  | OpenSheetAction
  | CloseSheetAction
  | RefetchSectionAction
  | ApiCallAction;

export interface NavigateAction {
  type: 'navigate';
  target: string;
  params?: Record<string, any>;
  paramsFromItem?: string[];
}

export interface UpdateStateAction {
  type: 'update_state';
  stateKey: string;
  value?: any;
  recompute?: string[];
  then?: SduiAction;
}

export interface OpenSheetAction {
  type: 'open_sheet';
  sheetId: string;
}

export interface CloseSheetAction {
  type: 'close_sheet';
}

export interface RefetchSectionAction {
  type: 'refetch_section';
  sectionId: string;
}

export interface ApiCallAction {
  type: 'api_call';
  url: string;
  method?: 'GET' | 'POST';
  body?: any;
  then?: SduiAction;
}

export type SduiComponentType = SduiSection['type'];

