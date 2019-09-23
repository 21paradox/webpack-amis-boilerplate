export async function getInvitaionStat({ data }) {
  console.log(data);
  return {
    data: {
      data: {
        inviteeListView: [],
        total: 0,
      },
      status: 0,
      msg: '',
    },
  };
}

export const limitNum = 10;
