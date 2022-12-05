var coords = [0,760];
var canvas = document.getElementById('draw_area');
var ctx = canvas.getContext('2d');
var generated_height_val = [];
var height_array_num = 0;
var ores_spawn_rate = [];
var blockTextures = [document.getElementById('stone'), document.getElementById('dirt'), document.getElementById('grass'),document.getElementById('coal'),document.getElementById('iron'),document.getElementById('gold'),document.getElementById('grass2'),document.getElementById('flower1'),document.getElementById('flower2'),document.getElementById('flower3'),document.getElementById('sand'),document.getElementById('sandstone'),document.getElementById('cactus'),document.getElementById('leaves'),document.getElementById('wood'),document.getElementById('dead_bush')];
var random_gen_val =[];
var max_chance = [40,80,150]
var coal_increm = 0;
var iron_increm = 0;
var gold_increm = 0;
var coal_coordsX = [];
var coal_coordsY = [];
var iron_coordsX = [];
var iron_coordsY = [];
var gold_coordsX = [];
var gold_coordsY = [];
var increase_coords = [];
var coal_chance = 2;
var iron_chance = 4;
var gold_chance = 15;
var the_nth_box = 0;
var grass_chance = 4;
var isFlowerBiome = false;
var isDessertBiome = false;
var regen_button = document.getElementsByTagName("form")[0];
var max_block_on_next_col = 3;
var min_block_on_next_col = 2;

 blockTextures[15].onload =() => {
	drawHorizontal();
};
setTimeout(()=>
{
	if(drawHorizontal.called != true)
	{
		drawHorizontal();
	}
},200);
function drawVerticaly()
{
	
	random_gen_val[0] = Math.floor(Math.random() * min_block_on_next_col); //min height 2
	random_gen_val[1] = Math.floor(Math.random() * (max_block_on_next_col - random_gen_val[0]) + random_gen_val[0]);//3
	for(a=0;a<generated_height_val[height_array_num] - 1;a++)
	{
	
		ores_spawn_rate[0] = Math.floor(Math.random() * max_chance[0]); // coal
	    ores_spawn_rate[1] = Math.floor(Math.random() * max_chance[1]); //iron
	    ores_spawn_rate[2] = Math.floor(Math.random() * max_chance[2]); // gold
		if(generated_height_val[height_array_num] < 3 + min_block_on_next_col)
		{
			console.log('s');
			generated_height_val[height_array_num] = 2 + min_block_on_next_col;
			console.log(generated_height_val[height_array_num])
		}
		if(800 - generated_height_val[height_array_num] * 20 == coords[1])
		{
			if(isDessertBiome != true)
			{
				ctx.drawImage(blockTextures[2], coords[0], coords[1], 20,20);
			}
			else{
				isFlowerBiome = false;
				ctx.drawImage(blockTextures[10], coords[0], coords[1], 20,20);
			}
		}
		
		else if(800 - (generated_height_val[height_array_num] - 1) * 20 == coords[1] || 800 - (generated_height_val[height_array_num] - 2) * 20 == coords[1] || 800 - (generated_height_val[height_array_num] - 3) * 20 == coords[1])
		{
			
			if(isDessertBiome != true)
			{
				ctx.drawImage(blockTextures[1], coords[0], coords[1], 20,20);
			}
			else{
				isFlowerBiome = false;
				ctx.drawImage(blockTextures[11], coords[0], coords[1], 20,20);
			}
		}
	    
		else if(800 - (generated_height_val[height_array_num] - 6) * 20 <= coords[1] && ores_spawn_rate[0] == 1) //coal
		{   
			
			coal_coordsX[coal_increm] = coords[0];
			coal_coordsY[coal_increm] = coords[1];
			ctx.drawImage(blockTextures[3],coords[0] ,coords[1] ,20 , 20);
			coal_increm++;
			max_chance[0] += 70;
		}
		else if(800 - (generated_height_val[height_array_num] - 8) * 20 <= coords[1] && ores_spawn_rate[1] == 1) //iron
		{
			ctx.drawImage(blockTextures[4],coords[0] ,coords[1] ,20 , 20);
			iron_coordsX[iron_increm] = coords[0];
			iron_coordsY[iron_increm] = coords[1];
			iron_increm++;
			max_chance[1] += 90;
		}
		else if(800 - (generated_height_val[height_array_num] - 10) * 20 <= coords[1] && ores_spawn_rate[2] == 1) //gold
		{
			ctx.drawImage(blockTextures[5],coords[0],coords[1],20,20);
			gold_coordsX[gold_increm] = coords[0];
			gold_coordsY[gold_increm] = coords[1];
			gold_increm++;
			max_chance[2] += 200;
		}
		
		else{
			ctx.drawImage(blockTextures[0], coords[0], coords[1], 20,20);
		}
		
		if(max_chance[0] > 30)
		{
			max_chance[0] -= Math.floor(Math.random() * 1);
		}
		if(max_chance[1] > 60)
		{
			max_chance[1] -= Math.floor(Math.random() * 1);
		}
		if(max_chance[2] > 190)
		{
			max_chance[2] -= Math.floor(Math.random() * 1);
		}
		coords[1] -= 20;
	}
	coords[1] = 760;
	height_array_num++;
	generated_height_val[height_array_num] = Math.floor(Math.random() * ((generated_height_val[height_array_num - 1] + random_gen_val[1]) - (generated_height_val[height_array_num - 1] - random_gen_val[0])) + (generated_height_val[height_array_num - 1] - random_gen_val[0]));
}
function drawHorizontal()
{
	drawHorizontal.called = true;
	//create sky gradient on canvas 
    var canvas_grd = ctx.createLinearGradient(0, 500, 000, 0);
    canvas_grd.addColorStop(1,"#54a4ff");
    canvas_grd.addColorStop(0,"#e6f1ff");
    ctx.fillStyle = canvas_grd;
    ctx.fillRect(0,0,1200,800);
	generated_height_val[height_array_num] = Math.floor(Math.random() * (25 - 15) + 15);
	for(i=0;i<60;i++)
	{
		ctx.drawImage(blockTextures[0], coords[0], 780, 20, 20);
		drawVerticaly();
		coords[0] += 20;
		if(i == 59)
		{
			smoothOres();
			if(isDessertBiome != true)
			{
				drawGrass();
			}
			else 
			{
				drawDessertDetails();
			}
			
		}
	}
}
var find_coords;
function smoothOres()
{
	for(b=0;b<coal_coordsX.length;b++) //for coal
	{
		
		for(c=0;c<4;c++)
		{
			switch(c)
			{
				case 0:
				  
				  if(Math.floor(Math.random() * coal_chance) == 1 )
				  {
					  coal_chance += Math.floor(Math.random() * 2);
					  increase_coords[0] = 20;
				      increase_coords[1] = 0;
					  coal_coordsX.push(coal_coordsX[the_nth_box] + increase_coords[0]);
					  coal_coordsY.push(coal_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[3],coal_coordsX[the_nth_box] + increase_coords[0],coal_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
				  break;
				case 1:
				  if(Math.floor(Math.random() * coal_chance) == 1)
				  {
					  coal_chance += Math.floor(Math.random() * 2);
					  increase_coords[0] = -20;
				      increase_coords[1] = 0;
					  coal_coordsX.push(coal_coordsX[the_nth_box] + increase_coords[0]);
					  coal_coordsY.push(coal_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[3],coal_coordsX[the_nth_box] + increase_coords[0],coal_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
				  
				  break;
				case 2:
				  if(Math.floor(Math.random() * coal_chance) == 1)
				  {
					  coal_chance += Math.floor(Math.random() * 2);
					  increase_coords[0] = 0;
				      increase_coords[1] = -20;
					  coal_coordsX.push(coal_coordsX[the_nth_box] + increase_coords[0]);
					  coal_coordsY.push(coal_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[3],coal_coordsX[the_nth_box] + increase_coords[0],coal_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
				  break;
				case 3:
				  if(Math.floor(Math.random() * coal_chance) == 1)
				  {
					  coal_chance += Math.floor(Math.random() * 2);
					  increase_coords[0] = 0;
				      increase_coords[1] = 20;
					  coal_coordsX.push(coal_coordsX[the_nth_box] + increase_coords[0]);
					  coal_coordsY.push(coal_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[3],coal_coordsX[the_nth_box] + increase_coords[0],coal_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
			}
			
		}
		the_nth_box++;
		if(b == coal_coordsX.length - 1)
		{
			the_nth_box = 0;
		}
	}
	for(d=0;d<iron_coordsX.length;d++) //for iron
	{
		
		for(e=0;e<4;e++)
		{
			switch(e)
			{
				case 0:
				  
				  if(Math.floor(Math.random() * iron_chance) == 1 )
				  {
					  iron_chance += Math.floor(Math.random() * 2);
					  increase_coords[0] = 20;
				      increase_coords[1] = 0;
					  iron_coordsX.push(iron_coordsX[the_nth_box] + increase_coords[0]);
					  iron_coordsY.push(iron_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[4],iron_coordsX[the_nth_box] + increase_coords[0],iron_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
				  break;
				case 1:
				  if(Math.floor(Math.random() * iron_chance) == 1)
				  {
					  iron_chance += Math.floor(Math.random() * 2);
					  increase_coords[0] = -20;
				      increase_coords[1] = 0;
					  iron_coordsX.push(iron_coordsX[the_nth_box] + increase_coords[0]);
					  iron_coordsY.push(iron_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[4],iron_coordsX[the_nth_box] + increase_coords[0],iron_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
				  
				  break;
				case 2:
				  if(Math.floor(Math.random() * iron_chance) == 1)
				  {
					  iron_chance += Math.floor(Math.random() * 2);
					  increase_coords[0] = 0;
				      increase_coords[1] = -20;
					  iron_coordsX.push(iron_coordsX[the_nth_box] + increase_coords[0]);
					  iron_coordsY.push(iron_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[4],iron_coordsX[the_nth_box] + increase_coords[0],iron_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
				  break;
				case 3:
				  if(Math.floor(Math.random() * iron_chance) == 1)
				  {
					  iron_chance += Math.floor(Math.random() * 2);
					  increase_coords[0] = 0;
				      increase_coords[1] = 20;
					  iron_coordsX.push(iron_coordsX[the_nth_box] + increase_coords[0]);
					  iron_coordsY.push(iron_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[4],iron_coordsX[the_nth_box] + increase_coords[0],iron_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
			}
			
		}
		the_nth_box++;
		if(d == iron_coordsX.length - 1)
		{
			the_nth_box = 0;
		}
	}
	for(f=0;f<gold_coordsX.length;f++) //for gold
	{
		
		for(g=0;g<4;g++)
		{
			switch(g)
			{
				case 0:
				  
				  if(Math.floor(Math.random() * gold_chance) == 1 )
				  {
					  gold_chance += Math.floor(Math.random() * 4);
					  increase_coords[0] = 20;
				      increase_coords[1] = 0;
					  gold_coordsX.push(gold_coordsX[the_nth_box] + increase_coords[0]);
					  gold_coordsY.push(gold_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[5],gold_coordsX[the_nth_box] + increase_coords[0],gold_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
				  break;
				case 1:
				  if(Math.floor(Math.random() * gold_chance) == 1)
				  {
					  gold_chance += Math.floor(Math.random() * 4);
					  increase_coords[0] = -20;
				      increase_coords[1] = 0;
					  gold_coordsX.push(gold_coordsX[the_nth_box] + increase_coords[0]);
					  gold_coordsY.push(gold_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[5],gold_coordsX[the_nth_box] + increase_coords[0],gold_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
				  
				  break;
				case 2:
				  if(Math.floor(Math.random() * gold_chance) == 1)
				  {
					  gold_chance += Math.floor(Math.random() * 4);
					  increase_coords[0] = 0;
				      increase_coords[1] = -20;
					  gold_coordsX.push(gold_coordsX[the_nth_box] + increase_coords[0]);
					  gold_coordsY.push(gold_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[5],gold_coordsX[the_nth_box] + increase_coords[0],gold_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
				  break;
				case 3:
				  if(Math.floor(Math.random() * gold_chance) == 1)
				  {
					  gold_chance += Math.floor(Math.random() * 4);
					  increase_coords[0] = 0;
				      increase_coords[1] = 20;
					  gold_coordsX.push(gold_coordsX[the_nth_box] + increase_coords[0]);
					  gold_coordsY.push(gold_coordsY[the_nth_box] + increase_coords[1]);
					  ctx.drawImage(blockTextures[5],gold_coordsX[the_nth_box] + increase_coords[0],coal_coordsY[the_nth_box] + increase_coords[1],20,20);
				  }
			}
			
		}
		the_nth_box++;
		if(f == gold_coordsX.length - 1)
		{
			the_nth_box = 0;
		}
	}
}

function drawGrass()
{
	let coordsX = 0;
	let flower_chance = 0;
	for(h=0;h<generated_height_val.length;h++)
	{
		if(Math.floor(Math.random() * grass_chance) == 1 && isFlowerBiome == false)
		{
			
			ctx.drawImage(blockTextures[6], coordsX, 800- generated_height_val[h] * 20 - 20,20,20);
			
		}
		else if(isFlowerBiome == true){ //then generates flower instead of grass
			flower_chance = Math.floor(Math.random() * 7);
			switch(flower_chance)
			{
				case 2: 
				  ctx.drawImage(blockTextures[7], coordsX, 800- generated_height_val[h] * 20 - 20,20,20);
				  break;
				case 4:
				  ctx.drawImage(blockTextures[8], coordsX, 800- generated_height_val[h] * 20 - 20,20,20);
				  break;
				case 6:
				  ctx.drawImage(blockTextures[9], coordsX, 800- generated_height_val[h] * 20 - 20,20,20);
			}
		}
		coordsX += 20;
		if(h == generated_height_val.length - 1)
		{
			drawTress();
		}
	}
}
function drawDessertDetails()
{   
	var cactus_coordsX = 0;
	var cactus_chance = 0;
	var max_val = 4;
	for(j=0;j<generated_height_val.length;j++)
	{
		if(Math.floor(Math.random() * 4) == 1)
		{
			cactus_chance = Math.floor(Math.random() * max_val);
			if(cactus_chance == 0 || cactus_chance == 1)
			{
				ctx.drawImage(blockTextures[12], cactus_coordsX, 800 - generated_height_val[j] * 20 - 20, 20,20);
				ctx.drawImage(blockTextures[12], cactus_coordsX, 800 - generated_height_val[j] * 20 - 40, 20,20);
				max_val += 8;
			}
			else if(cactus_chance == 2 || cactus_chance == 3)
			{
				ctx.drawImage(blockTextures[12], cactus_coordsX, 800 - generated_height_val[j] * 20 - 20, 20,20);
				ctx.drawImage(blockTextures[12], cactus_coordsX, 800 - generated_height_val[j] * 20 - 40, 20,20);
				ctx.drawImage(blockTextures[12], cactus_coordsX, 800 - generated_height_val[j] * 20 - 60, 20,20);
				max_val += 8;
			}
			
			else if(cactus_chance == 4)
			{
				ctx.drawImage(blockTextures[12], cactus_coordsX, 800 - generated_height_val[j] * 20 - 20, 20,20);
				ctx.drawImage(blockTextures[12], cactus_coordsX, 800 - generated_height_val[j] * 20 - 40, 20,20);
				ctx.drawImage(blockTextures[12], cactus_coordsX, 800 - generated_height_val[j] * 20 - 60, 20,20);
				ctx.drawImage(blockTextures[12], cactus_coordsX, 800 - generated_height_val[j] * 20 - 80, 20,20);
				max_val += 8;
			}
			else if(8 <= cactus_chance <= 9)
			{
				ctx.drawImage(blockTextures[15], cactus_coordsX, 800 - generated_height_val[j] * 20 - 20, 20,20);
			}
			else 
			{
				max_val -= 1;
			}
		}
		cactus_coordsX += 20;
	}
	
}
var path_clear = false;
function drawTress()
{
    let tree_chance;	
	let coordX = 0;
	let leaves_y = 2;
	let trunk_height = 0;
	
	
	let blocks_available = 0;
	for(window.k=0;k<generated_height_val.length;k++)
	{
		tree_chance = Math.floor(Math.random() * (10 - 7) + 7);
		coordX += tree_chance * 20;
		k += tree_chance;
		if(generated_height_val[k -1] <= generated_height_val[k] + 1 && generated_height_val[k -2] <= generated_height_val[k] + 1 && generated_height_val[k + 1] <= generated_height_val[k] + 1 && generated_height_val[k + 2] <= generated_height_val[k] + 1)
		{
			path_clear = true;
		}
		else{
			path_clear = false;
		}
		if(path_clear == true)
		{
			trunk_height = Math.floor(Math.random() * (8 - 5) + 5);
			for(l=1;l<trunk_height;l++)
			{
				ctx.drawImage(blockTextures[14],coordX, 800 - generated_height_val[k] * 20 - l * 20,20,20);
				switch(l)
				{
					case trunk_height - 3:
					  for(m=-2;m<3;m++)
				      {
					     ctx.drawImage(blockTextures[13], coordX + (m * 20),800 - generated_height_val[k] * 20 - (trunk_height - 3) * 20,20,20);
					   
				      }
					  break;
					case trunk_height - 2:
					  for(n=-2;n<3;n++)
				      {
					     ctx.drawImage(blockTextures[13], coordX + (n * 20),800 - generated_height_val[k] * 20 - (trunk_height - 2) * 20,20,20);
					   
				      }
					  break;
					case trunk_height - 1:
					  for(o=-1;o<2;o++)
				      {
					     ctx.drawImage(blockTextures[13], coordX + (o * 20),800 - generated_height_val[k] * 20 - (trunk_height -1 )* 20,20,20);
						 ctx.drawImage(blockTextures[13], coordX + (o * 20),800 - generated_height_val[k] * 20 - (trunk_height  )* 20,20,20);
					   
				      }
	  
				}

			}
		}
		coordX += 20;
	}
}
function generateTerrain()
{
	event.preventDefault();
	min_block_on_next_col = document.getElementById('min_height').value;
	min_block_on_next_col = parseInt(min_block_on_next_col);
	max_block_on_next_col = document.getElementById('max_height').value;
	max_block_on_next_col = parseInt(max_block_on_next_col);
	var biome_type = document.getElementById('biomes').value;
	if(biome_type == "Forest_Biome")
	{
		isDessertBiome = false;
		isFlowerBiome = false;
	}
	else if(biome_type == "Flower_Biome")
	{
		console.log('flower')
		isDessertBiome = false;
		isFlowerBiome = true;
	}
	else
	{
		isDessertBiome = true;
		isFlowerBiome = false;
	}
	
	ctx.fillRect(0,0,1200,800);
	generated_height_val = null;
	generated_height_val = [];height_array_num = 0;
	coords = [0,760];
    height_array_num = 0;
    ores_spawn_rate = [];
    random_gen_val =[];
    max_chance = [40,80,150]
    coal_increm = 0;
    iron_increm = 0;
    gold_increm = 0;
    coal_coordsX = [];
    coal_coordsY = [];
    iron_coordsX = [];
    iron_coordsY = [];
    gold_coordsX = [];
    gold_coordsY = [];
    increase_coords = [];
    coal_chance = 2;
    iron_chance = 4;
    gold_chance = 15;
    the_nth_box = 0;
    grass_chance = 4;
	drawHorizontal();
	
}
document.getElementById('download_button').addEventListener('click', ()=>{
	
	console.log('downloading...');
	var dataImage = canvas.toDataURL("image/png",0.3);
	var canvas_img = document.createElement('a');
	canvas_img.href=dataImage; 
	canvas_img.download = "terrain.png";
	document.body.appendChild(canvas_img);
	canvas_img.click();
	
	
})