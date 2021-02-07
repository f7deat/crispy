using ApplicationCore.Entities;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationCore.Helpers
{
    public class ExcelHelper
    {
        public static async Task<dynamic> ExportProduct(List<Product> products)
        {
            using ExcelPackage package = new ExcelPackage();
            ExcelWorksheet worksheet = package.Workbook.Worksheets.Add(nameof(Product));
            int totalRows = products.Count() + 1;
            worksheet.Cells[1, 1].Value = "STT";
            worksheet.Cells[1, 2].Value = "Sản phẩm";
            worksheet.Cells[1, 3].Value = "Đơn giá";
            worksheet.Cells[1, 4].Value = "Giá khuyến mại";
            worksheet.Cells[1, 5].Value = "Kho";
            int i = 0;
            for (int row = 2; row <= totalRows; row++)
            {
                worksheet.Cells[row, 1].Value = i + 1;
                worksheet.Cells[row, 2].Value = products[i].Name;
                worksheet.Cells[row, 3].Value = products[i].UnitPrice;
                worksheet.Cells[row, 4].Value = products[i].SalePrice;
                worksheet.Cells[row, 5].Value = products[i].UnitStock;
                i++;
            }
            worksheet.Cells.AutoFitColumns();
            worksheet.Row(1).Style.Font.Bold = true;
            var range = worksheet.Cells[$"A1:E{totalRows}"];
            range.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            range.Style.Border.Top.Style = ExcelBorderStyle.Thin;
            range.Style.Border.Left.Style = ExcelBorderStyle.Thin;
            range.Style.Border.Right.Style = ExcelBorderStyle.Thin;
            return await package.GetAsByteArrayAsync();
        }
    }
}
