import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import TableCellComponent from 'src/components/TableCellComponent/TableCellComponent';

function TableShowListLessons({
  listLessons,
  labelTableLessons,
  getStatusLabel
}: any) {
  return (
    <>
      <TableContainer>
        <TableHead>
          <TableRow>
            {/* map label bảng */}
            {labelTableLessons.map((item: any) => (
              <TableCell align="center" key={item.id}>
                {item.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listLessons &&
            listLessons.map((item: any) => {
              return (
                <TableRow hover key={item.id}>
                  <TableCellComponent value={item.id} />
                  <TableCellComponent value={item.name} />

                  <TableCell align="center">
                    {getStatusLabel(item.status, 'Hoạt động', 'Tạm khóa')}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </TableContainer>
    </>
  );
}

export default TableShowListLessons;
