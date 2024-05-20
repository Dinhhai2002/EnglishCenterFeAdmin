import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useContext, useLayoutEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import DropDown from 'src/components/DropDown/DropDown';
import FormInput from 'src/components/FormReact/FormInput';
import postApiService from 'src/services/API/PostApiService';
import promotionApiService from 'src/services/API/PromotionApiService';
import { PromotionTypeEnum } from 'src/utils/enum/PromotionTypeEnum';
import { EditSuccess } from 'src/utils/MessageToast';
import { listPromotionType, Max_Value_Percent } from './PageHeader';
import ChapterContext from './RecentOrdersTable';
import { ValidateInput, validateSchema } from './ValidateFormCreate';

function DialogEdit({ openDialogMapEdit, id, handleCloseEdit, item }) {
  const [promotion, setPromotion] = useState<any>(item);
  const [loading, setLoading] = useState(false);
  const [promotionType, setPromotionType] = useState('');

  //   sử dụng context để call lấy dữ liệu khi edit thành công
  const chapterContext = useContext(ChapterContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useLayoutEffect(() => {
    promotionApiService
      .findOne(id)
      .then((data) => {
        setPromotion(data.data);
        setPromotionType(data.data.promotion_type);
      })
      .catch((error: any) => {});
  }, []);

  const handleChangePromotionType = (event: SelectChangeEvent) => {
    setPromotionType(event.target.value);
  };

  const methods = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema)
  });
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset
  } = methods;

  const onSubmitHandler: SubmitHandler<ValidateInput> = async (values: any) => {
    setLoading(true);
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
    const data = await promotionApiService.update(
      id,
      values.description,
      Number(promotionType),
      values.promotion_value,
      values.point
    );
    toast.success(EditSuccess);
    handleCloseEdit(id);
    setLoading(false);
    chapterContext.onChangeValue();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDialogMapEdit[id] || false}
      onClose={() => {
        handleCloseEdit(id);
      }}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Slide}
      transitionDuration={600}
    >
      <DialogTitle
        sx={{ fontWeight: 600, fontSize: 20 }}
        id="responsive-dialog-title"
      >
        Thông tin chi tiết khuyến mãi
      </DialogTitle>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          autoComplete="off"
          noValidate
          sx={{ mt: 1 }}
        >
          <DialogContent>
            <FormInput
              type="text"
              name="description"
              defaultValue={promotion.description}
              required
              fullWidth
              label="description"
              sx={{ mb: 2 }}
            />

            <Box sx={{ marginTop: 2, marginBottom: 2, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel required id="demo-simple-select-label">
                  Loại khuyến mãi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={promotionType}
                  label=" Loại khuyến mãi"
                  onChange={handleChangePromotionType}
                >
                  {listPromotionType.map((item: any) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <FormInput
              type="number"
              name="promotion_value"
              defaultValue={`${promotion.promotion_value}`}
              required
              fullWidth
              label="Giá trị khuyến mãi"
              sx={{ mb: 2 }}
            />

            <FormInput
              type="number"
              name="point"
              defaultValue={`${promotion.point}`}
              required
              fullWidth
              label="Số điểm quy đổi"
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                reset();
                handleCloseEdit(id);
              }}
              variant="outlined"
            >
              Thoát
            </Button>
            <LoadingButton
              loading={loading}
              type="submit"
              autoFocus
              variant="outlined"
            >
              cập nhật
            </LoadingButton>
          </DialogActions>
        </Box>
      </FormProvider>
    </Dialog>
  );
}

export default DialogEdit;
