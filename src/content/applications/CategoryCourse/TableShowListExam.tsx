import {
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';

function TableShowListExam({
  listCourse,
  labelTableExam,
  getStatusLabel
}: any) {
  return (
    <>
      <TableContainer>
        <TableHead>
          <TableRow>
            {/* map label bảng */}
            {labelTableExam.map((item: any) => (
              <TableCell align="center" key={item.id}>
                {item.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listCourse &&
            listCourse.map((item: any) => {
              return (
                <TableRow hover key={item.id}>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.name}
                    </Typography>
                  </TableCell>

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

export default TableShowListExam;
