using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models;
using Identity;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class OfferService : IOfferService
    {
        private readonly IOfferRepository _offerRepository;
        public OfferService(IOfferRepository offerRepository)
        {
            _offerRepository = offerRepository;
        }

        public async Task<dynamic> AddAsync(Offer item)
        {
            item.CreatedDate = DateTime.Now;
            item.ModifiedDate = DateTime.Now;
            item.Status = 1;
            return new
            {
                succeeded = true,
                data = await _offerRepository.AddAsync(item)
            };
        }

        public async Task<dynamic> AddDetailsAsync(OfferDetail item)
        {
            return await _offerRepository.AddDetailsAsync(item);
        }

        public Task<object> DeleteAsync(long id)
        {
            return _offerRepository.DeleteAsync(id);
        }

        public async Task<byte[]> ExportAsync(long id, ApplicationUser user)
        {
            var offer = await _offerRepository.GetByIdAsync(id);
            List<OfferExcel> colection = await _offerRepository.GetOfferExcel(id);
            using ExcelPackage package = new ExcelPackage();
            ExcelWorksheet worksheet = package.Workbook.Worksheets.Add(nameof(OfferExcel));

            // Global Font
            worksheet.Cells["A1:I100"].Style.Font.SetFromFont(new Font("Times New Roman", 12));
            worksheet.DefaultRowHeight = 25;

            worksheet.Cells["A1:I1"].Merge = true;
            worksheet.Cells[1, 1].Value = "CÔNG TY TNHH TM VÀ DV KỸ THUẬT ĐIỆN ANH MINH";
            worksheet.Cells[1, 1].Style.Font.Bold = true;
            worksheet.Cells[1, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            worksheet.Cells[4, 1].Value = "BẢNG CHÀO GIÁ";
            worksheet.Cells[4, 1].Style.Font.Size = 20;
            worksheet.Cells[4, 1].Style.Font.Bold = true;
            worksheet.Cells[4, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells["A4:I4"].Merge = true;

            worksheet.Cells[5, 1].Value = "Người nhận";
            worksheet.Cells[6, 1].Value = "Tên công ty";
            worksheet.Cells[7, 1].Value = "Điện thoại/Fax";
            worksheet.Cells[8, 1].Value = "Email";

            worksheet.Cells[5, 6].Value = $"Ngày: {DateTime.Now.ToString("dd/MM/yyyy")}";
            worksheet.Cells[6, 6].Value = $"Người gửi: {user.Name}";
            worksheet.Cells[7, 6].Value = $"Số điện thoại: {user.PhoneNumber}";
            worksheet.Cells[8, 6].Value = $"Email: {user.Email}";

            worksheet.Cells[9, 1].Value = "Công ty TNHH TM & DV KT Điện Anh Minh chân thành cảm ơn Quý Công ty đã quan tâm đến sản phẩm của Công ty chúng tôi.";
            worksheet.Cells["A9:I9"].Merge = true;

            worksheet.Cells[10, 1].Value = "Theo yêu cầu báo giá của Quý Công ty, chúng tôi xin gửi bảng chào giá tốt nhất của Công ty TNHH TM & DV KT Điện Anh Minh như sau:";
            worksheet.Cells["A10:I10"].Merge = true;

            int totalRows = colection.Count() + 13;
            worksheet.Cells[12, 1].Value = "STT";
            worksheet.Cells[12, 2].Value = "Tên vật tư";
            worksheet.Cells[12, 3].Value = "Mã hiệu";
            worksheet.Cells[12, 4].Value = "Hãng";
            worksheet.Cells[12, 5].Value = "ĐVT";
            worksheet.Cells[12, 6].Value = "SL";
            worksheet.Cells[12, 7].Value = "Đơn giá";
            worksheet.Cells[12, 8].Value = "Thành tiền";
            worksheet.Cells[12, 9].Value = "Ghi chú";

            worksheet.Cells["A12:I12"].Style.Font.Bold = true;
            worksheet.Cells["A12:I12"].Style.Fill.PatternType = ExcelFillStyle.Solid;
            worksheet.Cells["A12:I12"].Style.Fill.BackgroundColor.SetColor(Color.LightGray);
            worksheet.Row(12).Style.VerticalAlignment = ExcelVerticalAlignment.Center;
            worksheet.Row(12).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells["A12:I12"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            worksheet.Cells["A12:I12"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
            worksheet.Cells["A12:I12"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
            worksheet.Cells["A12:I12"].Style.Border.Top.Style = ExcelBorderStyle.Thin;

            int i = 0;
            CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");
            for (int row = 13; row < totalRows; row++)
            {
                worksheet.Cells[row, 1].Value = i + 1;
                worksheet.Cells[row, 2].Value = colection[i].ProductName;
                worksheet.Cells[row, 3].Value = "-";
                worksheet.Cells[row, 4].Value = "-";
                worksheet.Cells[row, 5].Value = "-";
                worksheet.Cells[row, 6].Value = colection[i].Quantity;
                worksheet.Cells[row, 7].Value = colection[i].UnitPrice?.ToString("#,###", cul.NumberFormat) ?? "Liên hệ";
                worksheet.Cells[row, 8].Value = colection[i].UnitPrice.HasValue ? (colection[i].UnitPrice * colection[i].Quantity)?.ToString("#,###", cul.NumberFormat) : "-";
                worksheet.Cells[row, 9].Value = colection[i].Note;
                i++;
            }

            for (int col = 1; col < 10; col++)
            {
                for (int row = 13; row < totalRows; row++)
                {
                    worksheet.Cells[row, col].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[row, col].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[row, col].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[row, col].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                }
            }

            worksheet.Cells[totalRows, 1].Value = colection.Count() + 1;
            worksheet.Cells[totalRows, 1].Style.Border.Top.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[totalRows, 1].Style.Border.Right.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[totalRows, 1].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[totalRows, 1].Style.Border.Left.Style = ExcelBorderStyle.Thin;

            worksheet.Cells[totalRows, 2].Value = "Tổng cộng tiền hàng";
            worksheet.Cells[totalRows, 2].Style.Font.Italic = true;
            worksheet.Cells[totalRows, 2].Style.Font.Bold = true;
            worksheet.Cells[$"B{totalRows}:G{totalRows}"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[$"B{totalRows}:G{totalRows}"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[$"B{totalRows}:G{totalRows}"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[$"B{totalRows}:G{totalRows}"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[$"B{totalRows}:G{totalRows}"].Merge = true;
            worksheet.Cells[$"B{totalRows}:G{totalRows}"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
            worksheet.Cells[$"B{totalRows}:G{totalRows}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            worksheet.Cells.AutoFitColumns();
            return await package.GetAsByteArrayAsync();
        }

        public async Task<dynamic> GetDetailsAsync(long id)
        {
            return new
            {
                offer = await _offerRepository.GetByIdAsync(id),
                details = await _offerRepository.GetDetailsAsync(id)
            };
        }

        public Task<IEnumerable<Offer>> GetListAsync() => _offerRepository.ListAllAsync();
    }
}
