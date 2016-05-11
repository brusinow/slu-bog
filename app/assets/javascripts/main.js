$(document).ready(function(){

$('#new-creature-form').hide();



$('a#home-btn').click(function(e){
  e.preventDefault();
   $('#table-row').show();
    $('#new-creature-form').hide();
  console.log('click home');

  $.ajax({
    url: '/api/creature/all',
    method: 'GET',
    success: function(data){
      console.log(data);
      var contentSection = $('#content-section')
      contentSection.html('');
      var creatures = data.creatures;
      var tags = data.tags;
      creatures.forEach(function(creature){
        var description = creature.description;
          if (description.length > 144){
        var useDescription = description.substring(0, 144) + '...';
          }else {
            var useDescription = creature.description
          }
        contentSection.append(
          '<tr><td style="font-weight:bold; text-align: center;">'+ creature.name +'</td><td>' + useDescription + '  <a class="show-link" href="/api/creature/'+creature.id+'">Read More</a> </td><td style="text-align: right;"><a class="edit-link" href="/api/creature/'+creature.id+'/edit">Edit</a> | <a class="delete-link" href="/api/creature/'+creature.id+'/new">Delete</a></td></tr>');

        tags.forEach(function(tag){
          console.log('tag is: ',tag);
        });
      });
    },
    error: function(err){
      console.log(err);
    }
  });
});




 $('#master-section').on('click', 'a.show-link', function(e){
  e.preventDefault();
  console.log('click');
  var aTag = $(this)
  $.ajax({
    url: aTag.attr('href'),
    method: 'GET',
    success: function(data){
      
      $('#content-section').html('<tr><td style="font-weight:bold; text-align: center;">'+ data.creature.name +'</td><td>' + data.creature.description + '</td><td style="text-align: right;"><a class="edit-link" href="/api/creature/'+data.creature.id+'/edit">Edit</a> | <a class="delete-link" href="/api/creature/'+data.creature.id+'/new">Delete</a></td></tr>');
    },
    error: function(err){
      console.log(err);
    }
  })
 });


 $('#master-section').on('click', '#new-button',function(e){
    e.preventDefault();
    $('#table-row').hide();
    $('#new-creature-form').show();
 })

// Tried all sorts of different stuff here - this was my last attempt (I assume there is some ruby magic that is easier)
 $('#new-creature-form').on('submit', function(e) {
   e.preventDefault();
    var creatureName = $('#creature_name').val();
    var creatureDesc = $('#creature_description').val();
    $.ajax({
      url: '/creatures',
      method: 'POST',
      data: { creature: {
        name: creatureName,
        description: creatureDesc
      }
      },
      success: function(data) {
        console.log(data)
         $('#table-row').show();
    $('#new-creature-form').hide();
      },
      error: function(err){
        console.log(err);
      }
    })
 });



























});
