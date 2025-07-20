import React from 'react';

import { RepeatOption } from '~/features/project-schedule/ui';
import { RepeatOptionItem } from '~/features/project-schedule/types';

export const REPEAT_OPTION = {
  week: { title: '매주', element: <RepeatOption.Week />, value: 'WEEK' },
  month: { title: '매달', element: <RepeatOption.Month />, value: 'MONTH' },
  year: { title: '매년', element: <RepeatOption.Year />, value: 'YEAR' },
} as const;

export const repeatOptionKeys = Object.keys(
  REPEAT_OPTION,
) as RepeatOptionItem[];
