class CreaturesController < ApplicationController
  def index
    @creatures = Creature.all
  end

  def new
    @creature = Creature.new
     @tags = Tag.all
  end

  def create
    creature = Creature.create creature_params
    update_tags(creature)
    redirect_to creatures_path
  end

  def show
    @creature = Creature.find params[:id]
   
  end

  def edit
    @creature = Creature.find params[:id]
    @tags = Tag.all
  end

  def update
    creature = Creature.find params[:id]
    creature.update creature_params
    update_tags(creature)
    redirect_to creatures_path
  end

  def destroy
      Creature.find(params[:id]).delete
    redirect_to creatures_path
  end

private
  def creature_params
    params.require(:creature).permit(:name, :description)
  end

  def update_tags(creature)
    #get the list of all checkboxes from the form
    tags = params[:creature][:tag_ids]
    #reset all the tags the creature currently has
    creature.tags.clear
    #go through all the tags from the form
    tags.each do |id|
      #only re-add the tags where checkboxes were checked
      if not id.blank?
      creature.tags << Tag.find(id) 
      end
    end
  end
end
