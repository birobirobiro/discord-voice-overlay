import { appConfig } from './config/app.js';

let allMembers = [];
let activeVoiceChannelId = '';

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('voiceStateUpdate', voiceStateUpdate);

client.login(appConfig.discord.token);

function voiceStateUpdate(oldMember, updatedMember) {
  const listTag = document.getElementById('list');

  const isMe = updatedMember.id === appConfig.discord.user_id;
  const exitedChannel = oldMember.voiceChannel && !updatedMember.voiceChannel;

  if (isMe && exitedChannel) {
    listTag.innerHTML = '';
    return;
  } else if (isMe) {
    activeVoiceChannelId = updatedMember.voiceChannelID;
  }

  const dispatchedChannel = updatedMember.voiceChannel || oldMember.voiceChannel;
  const isMyVoiceChannel = dispatchedChannel.id === activeVoiceChannelId;
  if (!isMyVoiceChannel) return;

  if (!isMe && exitedChannel) {
    allMembers = allMembers.filter(member => updatedMember.id !== member.id);
    clearAndShowMembers(allMembers);
    return;
  }

  allMembers = updatedMember.voiceChannel.members
    .map(member => {
      return {
        id: member.id,
        name: member.nickname || member.user.username,
        avatarURL: member.user.avatarURL,
        isMuted: member.mute,
        isDeafed: member.deaf,
      };
    })
    .sort((member1, member2) => {
      if (member1.name < member2.name) return -1;
      if (member1.name > member2.name) return 1;
      return 0;
    });

  clearAndShowMembers(allMembers);
}

function clearAndShowMembers(members) {
  const listTag = document.getElementById('list');

  listTag.innerHTML = '';

  members.forEach(member => {
    listTag.innerHTML += `
      <li>
        <div class="memberContainer">
          <img src="${member.avatarURL}" alt="${member.name}" />
        </div>
      </li>
    `;
  });
}
