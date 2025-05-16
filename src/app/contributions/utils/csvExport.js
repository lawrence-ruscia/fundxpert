export const convertToCSV = (data, visibleColumns) => {
  // Define CSV headers based on visible columns
  const headers = [];

  visibleColumns.forEach((column) => {
    if (
      column.id === 'select' ||
      column.id === 'actions' ||
      !column.getIsVisible()
    ) {
      return; // Skip utility columns (select & actions)
    }

    const headerName = column.columnDef.header;
    headers.push(typeof headerName === 'string' ? headerName : column.id);
  });

  //  Remove any duplicate headers that might exist for interest columns
  const uniqueHeaders = [...new Set(headers)];
  let csvContent = uniqueHeaders.join(',') + '\n';

  data.forEach((row) => {
    const rowData = [];

    visibleColumns.forEach((column) => {
      if (
        column.id === 'select' ||
        column.id === 'actions' ||
        !column.getIsVisible()
      ) {
        return;
      }

      const columnId = column.id;

      switch (columnId) {
        case 'date': {
          const date = new Date(row.date);
          rowData.push(
            date.toLocaleDateString('en-PH', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          );
          break;
        }

        case 'description':
          rowData.push(`"${(row.description || '').replace(/"/g, '""')}"`);
          break;

        case 'employee':
          if (row.employee && row.employee[0]) {
            // Format with contribution and interest combined
            const contribution = row.employee[0].contribution || 0;
            const interest = row.employee[0].income || 0;

            if (interest > 0) {
              rowData.push(
                `"₱${contribution.toLocaleString()} + ₱${interest.toLocaleString()} interest"`
              );
            } else {
              rowData.push(`"₱${contribution.toLocaleString()}"`);
            }
          } else {
            rowData.push('"₱0"');
          }
          break;

        case 'bank':
          if (row.bank && row.bank[0]) {
            // Format with contribution and interest combined
            const contribution = row.bank[0].contribution || 0;
            const interest = row.bank[0].income || 0;

            if (interest > 0) {
              rowData.push(
                `"₱${contribution.toLocaleString()} + ₱${interest.toLocaleString()} interest"`
              );
            } else {
              rowData.push(`"₱${contribution.toLocaleString()}"`);
            }
          } else {
            rowData.push('"₱0"');
          }
          break;

        case 'total':
          if (row.total && row.total[0]) {
            // Format with contribution and interest combined
            const contribution = row.total[0].contribution || 0;
            const interest = row.total[0].income || 0;

            if (interest > 0) {
              rowData.push(
                `"₱${contribution.toLocaleString()} + ₱${interest.toLocaleString()} interest"`
              );
            } else {
              rowData.push(`"₱${contribution.toLocaleString()}"`);
            }
          } else {
            rowData.push('"₱0"');
          }
          break;

        case 'balance':
          rowData.push(`"₱${(row.balance || 0).toLocaleString()}"`);
          break;

        default: {
          const value = row[columnId];
          rowData.push(value !== undefined ? value : '');
        }
      }
    });

    csvContent += rowData.join(',') + '\n';
  });

  return csvContent;
};

// Function to trigger download of CSV file
export const downloadCSV = (
  data,
  visibleColumns,
  filename = 'contribution-statement.csv'
) => {
  const csvContent = convertToCSV(data, visibleColumns);

  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = '\uFEFF';
  const csvContentWithBOM = BOM + csvContent;

  const blob = new Blob([csvContentWithBOM], {
    type: 'text/csv;charset=utf-8;',
  });

  const link = document.createElement('a');

  // Create the URL for the blob
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  // Add to document, click and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateFilename = (prefix = '') => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format

  if (prefix) {
    return `${prefix}-contribution-statement-${formattedDate}.csv`;
  }

  return `contribution-statement-${formattedDate}.csv`;
};
