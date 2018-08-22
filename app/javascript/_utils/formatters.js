/* eslint camelcase: 0 */

import { DateTime } from 'luxon';

export function formatPhoneExtension({ phone_extension_number }) {
  const phoneExtension = phone_extension_number
    ? ` Ext ${phone_extension_number}`
    : '';
  return phoneExtension;
}

export function formatDate(date) {
  let formattedDate = date ? DateTime.fromISO(date).toFormat('MM/dd/yyyy') : '';
  return formattedDate;
}

export function formatPermissions(permissions) {
  if (Array.isArray(permissions)) return permissions;
  if (permissions === null) return [];
  if (typeof permissions !== 'undefined') return permissions.split(',');
  return [];
}
