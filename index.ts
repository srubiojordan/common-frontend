export function downloadFile(data: any[], name?: string) {
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob(['\ufeff' + csvArray], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = name ? `${name}.csv` : `${data[0].codigo}.csv`
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }