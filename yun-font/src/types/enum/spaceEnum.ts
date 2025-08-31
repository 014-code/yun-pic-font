export const SPACE_ENUM = {

  ORDINARY: 0,

  MAJOR: 1,

  FLAGSHIP: 2

}

export const SPACE_MAP = {

  0: '普通空间',

  1: '专业空间',

  2: '旗舰空间'

}

export const SPACE_OPTIONS = Object.entries(SPACE_MAP).map(([keyStr, label]) => ({
  value: Number(keyStr), // 如 '0' → 0
  label: label           // 如 '普通空间'
}))
