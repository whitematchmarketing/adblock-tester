export type ICoords = [number, number?, number?];
export enum EPriority {
  "critical" = 1,
  "high" = 0.8,
  "medium" = 0.6,
  "low" = 0.4,
  "trivial" = 0.2,
}

export enum ECheckType {
  script = "script",
  localLoading = "localLoading",
  size = "size",
  eval = "eval",
}

export enum EStatus {
  pending = "pending",
  unknown = "unknown",
  blocked = "blocked",
  likelyBlocked = "likelyBlocked",
  likelyUnblocked = "likelyUnblocked",
  unblocked = "unblocked",
}

export const statusWeights = {
  [EStatus.pending]: 0,
  [EStatus.unknown]: 0,
  [EStatus.unblocked]: 0,
  [EStatus.blocked]: 1,
  [EStatus.likelyBlocked]: 0.75,
  [EStatus.likelyUnblocked]: 0.25,
};

export const typeWeights = {
  [ECheckType.script]: 0.75,
  [ECheckType.eval]: 0.75,
  [ECheckType.localLoading]: 0.75,
  [ECheckType.size]: 1,
};

export type ISection = {
  id: string;
  prevVisible: boolean;
  visible: boolean;
  active: boolean;
  titleKey: string;
  descriptionKey: string;
  priority: keyof typeof EPriority;
  services: string[];
};

export type IService = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  prevVisible: boolean;
  visible: boolean;
  active: boolean;
  checks: string[];
};

export type ICheck = IScriptCheck | IEvalCheck | ISizeCheck;

type ICommonsFromCheck = {
  sectionId: string;
  id: string;
  status: EStatus;
};
export type IScriptCheck = ICommonsFromCheck & {
  type: ECheckType.script;
  url: string;
  approxSize: number;
};
export type IEvalCheck = ICommonsFromCheck & {
  type: ECheckType.eval;
  evals: string[];
  depends?: string;
};
export type IFetchMediaSizeCheck = ICommonsFromCheck & {
  type: ECheckType.localLoading;
  url: string;
  approxSize: number;
};
export type ISizeCheck = ICommonsFromCheck & {
  type: ECheckType.size;
  include: string;
  visible: boolean;
  flash?: boolean;
  proved?: boolean;
  withApproval?: boolean;
};
