import { useMemo } from 'react'
import { ReloadOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useUsers } from '@/hooks/useUsers'
import type { User } from '@/types/user'

const roleColorMap: Record<string, string> = {
  admin: 'gold',
  manager: 'blue',
  user: 'green',
}

const getRoleColor = (role: string) => roleColorMap[role.toLowerCase()] ?? 'default'

export const UserList = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useUsers()

  const columns = useMemo<ColumnsType<User>>(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (role: string) => <Tag color={getRoleColor(role)}>{role}</Tag>,
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">admin</div>
            <Typography.Title level={2} className="!mb-0 !text-slate-900">
              사용자 목록
            </Typography.Title>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              `GET /api/users`로 받아온 데이터를 조회하는 관리자 화면입니다. name, email, role을 표 형태로 보여줍니다.
            </p>
          </div>
          <Button
            icon={<ReloadOutlined />}
            loading={isFetching && !isLoading}
            onClick={() => refetch()}
            className="border border-slate-200 bg-white text-slate-700 shadow-sm hover:!border-slate-300 hover:!text-slate-900"
          >
            새로고침
          </Button>
        </div>
      </section>

      {isError ? (
        <Alert
          type="error"
          showIcon
          message="사용자 목록을 불러오지 못했습니다."
          description={error instanceof Error ? error.message : '백엔드 서버 상태를 확인한 뒤 다시 시도해 주세요.'}
        />
      ) : null}

      <Card className="border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 0 } }}>
        <Table<User>
          rowKey={(record) => String(record.id)}
          columns={columns}
          dataSource={data ?? []}
          loading={isLoading}
          pagination={false}
          className="rounded-[2rem]"
        />
      </Card>

      {!isLoading && !isError && (data?.length ?? 0) === 0 ? (
        <Card className="border border-dashed border-slate-200 bg-white text-slate-500 shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
          표시할 사용자가 없습니다.
        </Card>
      ) : null}
    </div>
  )
}
