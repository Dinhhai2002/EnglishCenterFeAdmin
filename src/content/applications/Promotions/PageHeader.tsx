import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  SelectChangeEvent,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DropDown from 'src/components/DropDown/DropDown';
import FormInput from 'src/components/FormReact/FormInput';
import { ValidateInput, validateSchema } from './ValidateFormCreate';
import { PromotionTypeEnum } from 'src/utils/enum/PromotionTypeEnum';
import promotionApiService from 'src/services/API/PromotionApiService';
import { CreateSuccess } from 'src/utils/MessageToast';

export const listPromotionType = [
  { id: 1, name: 'Phần trăm' },
  { id: 2, name: 'Tiền mặt' }
];
export const Max_Value_Percent = 40;

function PageHeader({ setChangeData, changeData }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promotionType, setPromotionType] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePromotionType = (event: SelectChangeEvent) => {
    setPromotionType(event.target.value);
  };

  const methods = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema)
  });
  const { handleSubmit, reset } = methods;

  const onSubmitHandler: SubmitHandler<ValidateInput> = async (values: any) => {
    setLoading(true);

    if (Number(promotionType) < 1) {
      toast.error('Vui lòng chọn loại khuyến mãi!');
      setLoading(false);
      return;
    }
    if (
      Number(promotionType) == PromotionTypeEnum.PERCENT &&
      values.promotion_value >= Max_Value_Percent
    ) {
      toast.error(
        `Giá trị khuyến mãi phần trăm không được lớn hơn ${Max_Value_Percent}!`
      );
      setLoading(false);
      return;
    }

    const data = await promotionApiService.create(
      values.description,
      Number(promotionType),
      values.promotion_value,
      values.point
    );

    toast.success(CreateSuccess);
    setLoading(false);
    setChangeData(!changeData);
    reset();
    handleClose();
  };

  return (
    <>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Thêm mới khuyến mãi
        </Button>
      </Grid>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        TransitionComponent={Slide}
        transitionDuration={600}
      >
        <DialogTitle
          sx={{ fontWeight: 600, fontSize: 20 }}
          id="responsive-dialog-title"
        >
          Tạo khuyến mãi
        </DialogTitle>
        <FormProvider {...methods}>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormInput
                type="text"
                name="description"
                defaultValue={''}
                required
                fullWidth
                label="description"
                sx={{ mb: 2 }}
              />

              <DropDown
                isMargin={true}
                value={promotionType}
                onChange={handleChangePromotionType}
                listValue={listPromotionType}
                label="Loại khuyến mãi"
              />
              <FormInput
                type="number"
                name="promotion_value"
                defaultValue={''}
                required
                fullWidth
                label="Giá trị khuyến mãi"
                sx={{ mb: 2 }}
              />

              <FormInput
                type="number"
                name="point"
                defaultValue={''}
                required
                fullWidth
                label="Số điểm quy đổi"
                sx={{ mb: 2 }}
              />

              <DialogActions sx={{ marginTop: 2 }}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={loading}
                >
                  Submit
                </LoadingButton>
                <Button autoFocus onClick={handleClose} variant="outlined">
                  Thoát
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </>
  );
}

export default PageHeader;
