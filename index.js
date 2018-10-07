const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
   console.log("Done!");
   client.user.setPresence( {
    status: "online",
    game: {
        name: "Cepolla belongs to Yue",
        type: "PLAYING"
    }
} );
});


var prefix = config.prefix;


client.on("message", (message) => {

      if (message.content.startsWith("Misco")) {
     message.channel.send("jones");
      }

      if (message.content.startsWith("misco")) {
        message.channel.send("jones");
         }

     if (message.content.startsWith("Que")) {
        message.channel.send("sito :cheese:");
      }
    
      if (message.content.startsWith("Qué")) {
        message.channel.send("sito :cheese:");
      }
    
      if (message.content.startsWith("qué")) {
        message.channel.send("sito :cheese:");
      }
    
      if (message.content.startsWith("tusmu")) {
        message.channel.send("rales");
      }
    
      if (message.content.startsWith("Tusmu")) {
        message.channel.send("rales");
      }
    
      if (message.content.startsWith("Arriba")) {
        message.channel.send("España :flag_es: ");
      }

  if (message.author.id!== '426407151330656256')return;
  if(message.content.startsWith(prefix + 'help')){

    message.channel.send('**'+message.author.username+'**, Acabo de mandarte todos los comandos al privado :yellow_heart: .');
    message.author.send(':yellow_heart: **__Mis comandos__** :yellow_heart:\n```\n'+
                        '-> '+prefix+'avatar <@user> :: Te mostraré el avatar del usuario nombrado.\n'+
                        '-> '+prefix+'user <@user>   :: Te enviaré la información del usuario nombrado.\n'+
                        '-> '+prefix+'server         :: Muestro información del servidor determinado.\n'+
                        '-> '+prefix+'ban <@user>    :: Baneo al usuario mencionado,incluyendo razón.\n'+
                        '-> '+prefix+'kick <@user>   :: Patear a un usuario del servidor incluye razon.\n'+
                        '');
    
  }
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === 'user'){
    let userm = message.mentions.users.first()
    if(!userm){
      var user = message.author;
      
        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
        .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
        .addField('ID', user.id, true)
        .addField('Estado', user.presence.status, true)
        .addField('Apodo', message.member.nickname, true)
        .addField('Cuenta creada', user.createdAt.toDateString(), true)
        .addField('Fecha de ingreso', message.member.joinedAt.toDateString())
        .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
        .setColor(0x66b3ff)
        
       message.channel.send({ embed });
    }else{
      const embed = new Discord.RichEmbed()
      .setThumbnail(userm.avatarURL)
      .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
      .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
      .addField('ID', userm.id, true)
      .addField('Estado', userm.presence.status, true)
      .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
      .setColor(0x66b3ff)
      
     message.channel.send({ embed });
    }
    
  }
  

  if(command === 'server'){

    var server = message.guild;
  
    const embed = new Discord.RichEmbed()
    .setThumbnail(server.iconURL)
    .setAuthor(server.name, server.iconURL)
    .addField('ID', server.id, true)
    .addField('Region', server.region, true)
    .addField('Creado el', server.joinedAt.toDateString(), true)
    .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
    .addField('Miembros', server.memberCount, true)
    .addField('Roles', server.roles.size, true)
    .setColor(0x66b3ff)
    
   message.channel.send({ embed });

  }

  if(command === 'avatar'){

    let img = message.mentions.users.first()
    if (!img) {

        const embed = new Discord.RichEmbed()
        .setImage(`${message.author.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
        message.channel.send({ embed });

    } else if (img.avatarURL === null) {

        message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");

    } else {

        const embed = new Discord.RichEmbed()
        .setImage(`${img.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
        message.channel.send({ embed });

    };


}

  if(command === 'ban'){
    
    let user = message.mentions.users.first();
    let razon = args.slice(1).join(' ');

    let perms = message.member.hasPermission("BAN_MEMBERS");

    if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
    if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
    if(!razon) return message.channel.send('Escriba un razón, `-ban @username [razón]`');
    if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
        
    
     message.guild.member(user).ban(razon);
     message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);
    
 }

  if(command === 'kick' ){

    let user = message.mentions.users.first();
    let razon = args.slice(1).join(' ');

    let perms = message.member.hasPermission("KICK_MEMBERS");

    if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
    if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
    if (!razon) return message.channel.send('Escriba una razón, `.n kick @username [razón]`');
    if (!message.guild.member(user).kickable) return message.reply('No puedo echar mencionado.');
     
    message.guild.member(user).kick(razon);
    message.channel.send(`**${user.username}**, ha sido expulsado con éxito. Razón: ${razon}.`);

  }
  let mirol =  message.guild.roles.find("name", "Administrador");

  if(command === 'rol'){

    if(!args) return message.channel.send('Ingrese nombre del rol.');
    let mirol = message.guild.roles.find("name", args.join(" "));
    if(!mirol) return message.channel.send('Rol no encontrado en el servidor.');

    if(message.member.roles.has(mirol.id)) {
      message.channel.send('Si tienes el rol: `'+mirol.name+'`.');
    } else {
      message.channel.send('No tienes el rol: `'+mirol.name+'`.');
    }

  }
  if(command === 'miembrosrol'){
        
    if(!args) return message.channel.send('Ingrese nombre del rol.');
    let rol = message.guild.roles.find("name", args.join(" "));
    if(!rol) return message.channel.send('Rol no encontrado en el servidor.');
    let miembroroles = message.guild.roles.get(rol.id).members;
    message.channel.send(`Tienes a **${miembroroles.size}** miembro(s) con el rol **${args}**.`);
    
  }

  if(command === 'addrol'){

    let miembro = message.mentions.members.first();
    let nombrerol = args.slice(1).join(' ');

    let role = message.guild.roles.find("name", nombrerol);
    let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");

    if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
     
    if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
    if(!nombrerol) return message.channel.send('Escriba el nombre del rol a agregar, `-addrol @username [rol]`');
    if(!role) return message.channel.send('Rol no encontrado en el servidor.');
    
    miembro.addRole(role).catch(console.error);
    message.channel.send(`El rol **${role.name}** fue agregado correctamente a **${miembro.user.username}**.`);

  }
  if(command === 'removerol'){

    let miembro = message.mentions.members.first();
    let nombrerol = args.slice(1).join(' ');

    let role = message.guild.roles.find("name", nombrerol);
    let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");

    if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
     
    if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
    if(!nombrerol) return message.channel.send('Escriba el nombre del rol a remover, `-removerol @miembro [rol]`');
    if(!role) return message.channel.send('Rol no encontrado en el servidor.');
    
    miembro.removeRole(role).catch(console.error);
    message.channel.send(`El rol **${role.name}** del miembro **${miembro.user.username}** fue removido  correctamente.`);

  }

});
client.login(config.token);
client.login(process.env.BOT_TOKEN);     
