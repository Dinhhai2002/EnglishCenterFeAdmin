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

function TableShowListClass({
  listClass,
  labelTableClass,
  getStatusLabel
}: any) {
  return (
    <>
      <TableContainer>
        <TableHead>
          <TableRow>
            {/* map label bảng */}
            {labelTableClass.map((item: any) => (
              <TableCell align="center" key={item.id}>
                {item.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listClass &&
            listClass.map((item: any) => {
              return (
                <TableRow hover key={item.id}>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
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

export default TableShowListClass;
