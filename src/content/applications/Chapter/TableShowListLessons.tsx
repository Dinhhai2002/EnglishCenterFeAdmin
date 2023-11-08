import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from '@mui/material';

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
                    {getStatusLabel(item.status)}
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
