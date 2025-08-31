export function saveJson<T>(data: T, filename: string) {
  const a = document.createElement('a');
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data)], { type: 'application/json' }),
  );
  const date = new Date();
  a.setAttribute(
    'download',
    `${filename}_${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}.json`,
  );
  a.setAttribute('href', url);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Tries to load a json file from the user's file system.
 * Since the user can cancel the file selection, which we don't get notified about,
 * we use a callback instead of a promise. There is no guarantee that the
 * callback will ever be called.
 */
export function tryLoadJson<T>(callback: (obj: T) => void): void {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const json = JSON.parse(reader.result as string);
      callback(json);
    };
    reader.readAsText(file);
  };
  input.click();
}
