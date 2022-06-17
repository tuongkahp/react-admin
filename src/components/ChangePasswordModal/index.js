import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';

const ChangePasswordModal = ({ visible, onOk, onCancel }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields()
  }, [visible])

  return (
    <Modal
      visible={visible}
      maskClosable={false}
      title={t('changePassword')}
      okText={t('confirm')}
      cancelText={t('cancel')}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then((values) => {
            form.resetFields();
            onOk(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 10 }}
        labelAlign='left'
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label={t('oldPassword')} name='oldPassword'
          rules={[
            {
              required: true,
              message: t('error.required'),
            }
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item label={t('newPassword')} name='newPassword'
          rules={[
            {
              required: true,
              message: t('error.required'),
            }
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={t("confirmPassword")}
          name='confirmPassword'
          rules={[
            {
              required: true,
              message: t('error.required'),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(t('error.confirmPasswordIncorrect'));
              },
            })
          ]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;