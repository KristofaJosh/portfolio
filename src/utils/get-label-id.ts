import { replace, toLower } from 'ramda';

export const getLabelId = (label: string) =>
	replace(/ /g, '_', toLower(`${label}_${crypto.randomUUID()}`));
