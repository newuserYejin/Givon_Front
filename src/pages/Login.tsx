import { Button, Card, Form, Input, Typography, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginRequest, isAuthApiError } from '@/api/auth'
import { authValidation } from '@/constants/authValidation'
import { useAuth } from '@/hooks/useAuth'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form] = Form.useForm()

  return (
    <div className="mx-auto max-w-md py-4 sm:py-8">
      <Card className="border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]" styles={{ body: { padding: 24 } }}>
        <div className="mb-8 space-y-3 text-center">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">welcome back</div>
          <Typography.Title level={2} className="!mb-0 !text-slate-900">
            로그인
          </Typography.Title>
          <p className="text-sm text-slate-600">이메일과 비밀번호로 로그인합니다.</p>
        </div>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className="space-y-1"
          onFinish={async (values) => {
            try {
              const session = await loginRequest({
                email: values.email,
                password: values.password,
              })

              login(session)
              message.success('로그인되었습니다.')
              navigate('/home')
            } catch (error) {
              if (isAuthApiError(error) && error.fieldErrors) {
                form.setFields(
                  Object.entries(error.fieldErrors).map(([name, errorMessage]) => ({
                    name,
                    errors: [errorMessage],
                  })),
                )

                message.error('입력값을 확인해 주세요.')
                return
              }

              message.error(error instanceof Error ? error.message : '로그인에 실패했습니다.')
            }
          }}
        >
          <Form.Item
            label="이메일"
            name="email"
            extra={`최대 ${authValidation.login.emailMaxLength}자`}
            rules={[
              { required: true, message: '이메일을 입력해 주세요.' },
              { type: 'email', message: '올바른 이메일 형식으로 입력해 주세요.' },
              {
                max: authValidation.login.emailMaxLength,
                message: `이메일은 최대 ${authValidation.login.emailMaxLength}자까지 입력할 수 있습니다.`,
              },
            ]}
          >
            <Input size="large" placeholder="name@example.com" maxLength={authValidation.login.emailMaxLength} />
          </Form.Item>
          <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: '비밀번호를 입력해 주세요.' }]}>
            <Input.Password size="large" placeholder="비밀번호" />
          </Form.Item>
          <Button type="primary" size="large" htmlType="submit" block className="border border-slate-900 bg-slate-900 font-medium text-white shadow-sm hover:!border-slate-700 hover:!bg-slate-800">
            로그인
          </Button>
        </Form>
        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
          <Link to="/register" className="text-slate-700 hover:text-slate-900">
            회원가입
          </Link>
          <Link to="/home" className="hover:text-slate-900">
            홈으로
          </Link>
        </div>
      </Card>
    </div>
  )
}
