const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "MTAwMDY5MzI3MjEzMTQwMzkxNg.Ga1hAe.CcBVvxwBtVSf3Sj32RlmTZD0xrG6gTkeBPt7oI";
const prefix = ".";

bot.on("ready", () => {
  console.log("Your Bot Is Now Online");
  const Text = "Hallo | type .creator";
  bot.user
    .setActivity(Text, { type: "PLAYING" })
    .then((Presence) => console.log(`Activity set to ${Presence.activities[0].name}`))
    .catch(console.error);

  bot.user.setStatus("online").then(console.log).catch(console.error);
});

bot.on("guildMemberAdd", (member) => {
  const welcomeChannel = "1000718597263470602";
  const welcomeText = `Welcome to my server <@${member.user.id}>`;

  Promise.resolve(welcomeText).then(function (welcomeText) {
    welcomeChannel.send(welcomeText);
  });
});

//========================= Command =============================
bot.on("message", (message) => {
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLocaleLowerCase();

  if (command === "creator") {
    //EMBED ======================================================
    const testEmbed = new Discord.RichEmbed()
      .setColor(0x0099ff) //6509ed
      .setTitle("")
      .setURL("https://twitter.com/ivelhaf99")
      .setDescription("Hii My Name is Muhammad Reza Fahlevi A.K.A Ivel")
      .setAuthor(message.author.username)
      .addField("Message", "How's your day?")
      .addField("Wanna Collab? ⬇️", "[Ig.](https://instagram.com/ivelhafazerm) [Tw.](https://twitter.com/ivelhaf99) [GitHub.](https://github.com/ivelhafazerm)")
      .setThumbnail("https://static.thenounproject.com/png/3194376-200.png")
      .setImage("https://cdn.discordapp.com/avatars/458955014556352512/abffd824b15cb8cdddf622065addd399.png?size=4096")
      .setFooter("This bot made by ivelhafazerm")
      .setTimestamp();
    try {
      message.channel.send(testEmbed);
    } catch {
      message.reply(`Sorry ${message.author.username}, i Cannot message you dms`);
    }
  }
  //BAN USER =======================================================
  else if (command === "ban") {
    if (message.member.hasPermission("BAN_MEMBERS")) {
      const userBan = message.mentions.users.first();
      if (userBan) {
        var member = message.guild.member(userBan);

        if (member) {
          member
            .ban({
              reason: "You break the rules!",
            })
            .then(() => {
              message.reply(`${userBan.tag} was banned from the server.`);
            });
        } else {
          message.reply("that user is not in the server.");
        }
      } else {
        message.reply("you need to state a user to ban");
      }
    } else {
      message.reply("Hey.. What you doin dawg!!");
    }
  }
  //KICK USER ======================================================
  else if (command === "kick") {
    if (message.member.hasPermission("BAN_MEMBERS")) {
      const userKick = message.mentions.users.first();

      if (userKick) {
        var member = message.guild.member(userKick);

        if (member) {
          member
            .kick("You have been kicked for breaking the rules")
            .then(() => {
              message.reply(`kicked user ${userKick.tag}!`);
            })
            .catch((err) => {
              message.reply("I was not able to kicked that user.");
              console.log(err);
            });
        } else {
          message.reply("that user is not the server.");
        }
      } else {
        message.reply("you need to tate the person you want to kick");
      }
    }
  } else if (command === "test") {
    const reply = "im still here";
    message.reply(reply);
  }
});

bot.login(token);
